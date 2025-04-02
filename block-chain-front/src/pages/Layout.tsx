// src/components/AppLayout.tsx
import { Outlet, Link, useNavigate } from "react-router-dom";
import type { MenuProps } from "antd";
import { Layout, Menu, Breadcrumb, Button, Avatar, Dropdown } from "antd";
import {
  HomeOutlined,
  UserOutlined,
  SettingOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";

const { Header, Content, Footer, Sider } = Layout;

const AppLayout = () => {
  const navigate = useNavigate();

  // 处理返回上一页
  const handleBack = () => {
    navigate(-1); // 返回上一页
  };

  // 用户下拉菜单
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: <div>个人中心</div>,
    },
    {
      key: "2",
      label: <div>退出登录</div>,
    },
  ];

  return (
    <Layout className="flex-c-sb-d" style={{ width: "100vw", height: "100vh" }}>
      {/* 顶部导航栏 */}
      <Header className="white flex-c-sb w100 bg">
        <div className=" flex-c-sa">
          <div className="w100 flex-c-c">
            <h1 className="white">LOGO</h1>
          </div>
          <Button
            type="text"
            icon={<ArrowLeftOutlined />}
            onClick={handleBack}
            className="white"
          >
            返回
          </Button>
        </div>

        <Dropdown menu={{ items }} placement="bottomRight">
          <div className="">
            <Avatar icon={<UserOutlined />} className="point" />
            <span className="point">用户名</span>
          </div>
        </Dropdown>
      </Header>

      <Layout className="flex-c-sb w100 flex1">
        {/* 侧边栏导航 */}
        <Sider className="flex1 h100 bg" breakpoint="lg" collapsedWidth="0">
          <Menu
            className="bg"
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["1"]}
          >
            <Menu.Item key="1" icon={<UserOutlined />}>
              <Link to="/Konwledge">首页</Link>
            </Menu.Item>
            <Menu.Item key="2" icon={<HomeOutlined />}>
              <Link to="/WalletConnector">Web3</Link>
            </Menu.Item>
            <Menu.Item key="3" icon={<SettingOutlined />}>
              <Link to="/user">个人中心</Link>
            </Menu.Item>
          </Menu>
        </Sider>
        {/* 主内容区域 */}
        <Content className="flex1 flex-c-sb-d h100">
          <Outlet /> {/* 这里渲染子路由内容 */}
          {/* 页脚 */}
          <Footer className="w100 top-line flex-c-c">
            ©{new Date().getFullYear()} seemountain -
            本网站仅限于学习参考使用不支持交易
          </Footer>
        </Content>
      </Layout>
    </Layout>
  );
};

export default AppLayout;
