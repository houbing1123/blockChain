// src/components/AppLayout.tsx
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { Layout, Menu, Breadcrumb, Button, Avatar, Dropdown } from 'antd';
import {
  HomeOutlined,
  UserOutlined,
  SettingOutlined,
  ArrowLeftOutlined,
  LogoutOutlined,
} from '@ant-design/icons';

const { Header, Content, Footer, Sider } = Layout;

const AppLayout = () => {
  const navigate = useNavigate();

  // 处理返回上一页
  const handleBack = () => {
    navigate(-1); // 返回上一页
  };

  // 用户下拉菜单
  const userMenu = (
    <Menu>
      <Menu.Item key="profile" icon={<UserOutlined />}>
        <Link to="/profile">个人中心</Link>
      </Menu.Item>
      <Menu.Item key="settings" icon={<SettingOutlined />}>
        <Link to="/settings">设置</Link>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="logout" icon={<LogoutOutlined />}>
        退出登录
      </Menu.Item>
    </Menu>
  );

  return (
    <Layout className="min-h-screen" style={{width:"100vw",height:"100vh"}}>
      {/* 侧边栏导航 */}
      <Sider breakpoint="lg" collapsedWidth="0">
        <div className="h-12 m-4 bg-white rounded flex items-center justify-center">
          <h1 className="text-lg font-bold text-blue-600">LOGO</h1>
        </div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
          <Menu.Item key="1" icon={<HomeOutlined />}>
            <Link to="/wallet">首页</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<UserOutlined />}>
            <Link to="/kownledge">Web3</Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<SettingOutlined />}>
            <Link to="/user">个人中心</Link>
          </Menu.Item>
        </Menu>
      </Sider>

      <Layout>
        {/* 顶部导航栏 */}
        <Header className="p-0 bg-white shadow-sm flex items-center justify-between px-4">
          <div className="flex items-center">
            <Button
              type="text"
              icon={<ArrowLeftOutlined />}
              onClick={handleBack}
              className="mr-2"
            >
              返回
            </Button>
            <Breadcrumb className="hidden md:block">
              <Breadcrumb.Item>首页</Breadcrumb.Item>
              <Breadcrumb.Item>当前页面</Breadcrumb.Item>
            </Breadcrumb>
          </div>

          <Dropdown overlay={userMenu} placement="bottomRight">
            <div className="flex items-center cursor-pointer">
              <Avatar icon={<UserOutlined />} className="mr-2" />
              <span className="hidden md:inline">用户名</span>
            </div>
          </Dropdown>
        </Header>

        {/* 主内容区域 */}
        <Content className="m-4">
          <div className="p-4 bg-white rounded-lg min-h-[calc(100vh-120px)]">
            <Outlet /> {/* 这里渲染子路由内容 */}
          </div>
        </Content>

        {/* 页脚 */}
        <Footer className="text-center text-gray-500">
          ©{new Date().getFullYear()} seemountain - 本网站仅限于学习参考使用不支持交易
        </Footer>
      </Layout>
    </Layout>
  );
};

export default AppLayout;