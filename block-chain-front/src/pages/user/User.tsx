// src/pages/UserProfile.tsx
import React, { useState } from 'react';
import { Avatar, Button, Card, Form, Input, message, Upload, UploadProps } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined, CameraOutlined } from '@ant-design/icons';
import { getLocal,getToken, setLocal } from '../../utils';


const User: React.FC = () => {
  const user:User = getLocal("user") as User;
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [avatar, setAvatar] = useState(`/api${user.avatar}`);

  const uploadProps: UploadProps = {
    name: 'file',
    action:  `/api/users/${user._id}/avatar`, // 实际项目中这里应该是上传头像的API地址
    showUploadList: false,
    method: 'PUT',
    headers: {
      authorization: `Bearer ${getToken()}`, // 实际项目中这里应该是获取token的方式
    },
    beforeUpload: (file) => {
      const isImage = file.type.startsWith('image/');
      if (!isImage) {
        message.error('只能上传图片文件!');
      }
      return isImage || Upload.LIST_IGNORE;
    },
    onChange: (info) => {
      if (info.file.status === 'done') {
        // 实际项目中这里应该调用API上传头像
        console.log(info,'info');
        const response = info.file.response;
        if(response && response.code === 200) {
          console.log('上传成功，接口返回：', response);
          setLocal("user", {...response.data});
          // 假设接口返回：{ url: '/assets/avatar/xxx.jpg' }
          message.success(`${info.file.name} 上传成功`);
          setAvatar(`/api${response.data.avatar}`); // 更新头像
        }
      }
    },
  };

  const onFinish = async (values: { currentPassword: string; newPassword: string }) => {
    setLoading(true);
    try {
      // 实际项目中这里应该调用API修改密码
      console.log('修改密码:', values);
      await new Promise(resolve => setTimeout(resolve, 1000)); // 模拟API请求
      message.success('密码修改成功');
      form.resetFields();
    } catch (error) {
      message.error('密码修改失败');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='w100 h100'>
      <Card title="个人信息">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex flex-col items-center">
            <Upload {...uploadProps}>
              <div className="relative group">
                <Avatar
                  size={128}
                  src={avatar}
                  icon={<UserOutlined />}
                  className="mb-2 shadow-md"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 flex items-center justify-center rounded-full transition-all cursor-pointer">
                  <CameraOutlined className="text-white opacity-0 group-hover:opacity-100 text-2xl" />
                </div>
              </div>
            </Upload>
            <h2 className="text-xl font-semibold mt-2">{user.name}</h2>
          </div>

          <div className="flex-1">
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-2">基本信息</h3>
              <div className="space-y-2">
                <div className="flex items-center">
                  <MailOutlined className="mr-2 text-gray-500" />
                  <span>邮箱: {user.email}</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-2">修改密码</h3>
              <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
              >
                <Form.Item
                  name="currentPassword"
                  label="当前密码"
                  rules={[{ required: true, message: '请输入当前密码' }]}
                >
                  <Input.Password prefix={<LockOutlined />} placeholder="当前密码" />
                </Form.Item>

                <Form.Item
                  name="newPassword"
                  label="新密码"
                  rules={[
                    { required: true, message: '请输入新密码' },
                    { min: 6, message: '密码至少6位字符' }
                  ]}
                >
                  <Input.Password prefix={<LockOutlined />} placeholder="新密码" />
                </Form.Item>

                <Form.Item
                  name="confirmPassword"
                  label="确认新密码"
                  dependencies={['newPassword']}
                  rules={[
                    { required: true, message: '请确认新密码' },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue('newPassword') === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(new Error('两次输入的密码不一致'));
                      },
                    }),
                  ]}
                >
                  <Input.Password prefix={<LockOutlined />} placeholder="确认新密码" />
                </Form.Item>

                <Form.Item>
                  <Button type="primary" htmlType="submit" loading={loading}>
                    修改密码
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default User;