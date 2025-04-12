// src/components/AppLayout.tsx
import { Outlet, useNavigate } from "react-router-dom";
import type { MenuProps } from "antd";
import { Layout, Menu, Button, Avatar, Dropdown } from "antd";
import {
  HomeOutlined,
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { getLocal } from "../utils";

const { Header, Content, Footer, Sider } = Layout;

const AppLayout = () => {
  const navigate = useNavigate();
  const user: User = getLocal("user") as User;
  // 退出登录
  // 清除token并跳转到登录页面
  const quit = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  // 用户下拉菜单
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <Button className="nohover" type="text" onClick={()=>navigate("/user")}>
          <SettingOutlined className="margin-right-10" />
          个人中心
        </Button>
      ),
    },
    {
      key: "2",
      label: (
        <Button className="nohover" type="text" onClick={quit}>
          <LogoutOutlined className="margin-right-10" />
          退出登录
        </Button>
      ),
    },
  ];

  const MenuItems: MenuProps["items"] = [
    {label: "首页", key: "/Konwledge", icon: <HomeOutlined />},
    {label: "web3", key: "/WalletConnector", icon: <UserOutlined />},
    {label: "个人中心", key: "/User", icon: <SettingOutlined />},
  ]
  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
    navigate(e.key);
  };

  return (
    <Layout className="flex-c-sb-d" style={{ width: "100vw", height: "100vh" }}>
      {/* 顶部导航栏 */}
      <Header className="white flex-c-sb w100 bg">
        <div className=" flex-c-sa">
          <div className="w100 flex-c-c">
            <h1 className="white">Web3</h1>
          </div>
        </div>

        <Dropdown menu={{ items }} placement="bottomRight">
          <div className="">
            <Avatar src={`/api${user.avatar}`} icon={<UserOutlined />} className="point margin-right-10" />
            <span className="point">{user?.username ?? "unkown"}</span>
          </div>
        </Dropdown>
      </Header>

      <Layout className="flex-c-sb w100 flex1">
        {/* 侧边栏导航 */}
        <Sider className="flex1 h100 bg" breakpoint="lg" collapsedWidth="0">
          <Menu
            className="bg"
            onClick={onClick}
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["1"]}
            items={MenuItems}
          />
            
        </Sider>
        {/* 主内容区域 */}
        <Content className="flex1 flex-c-sb-d h100">
          <Outlet /> {/* 这里渲染子路由内容 */}
          {/* 页脚 */}
          <Footer className="w100 top-line flex-c-c">
            ©{new Date().getFullYear()} seemountain -
            本网站仅限于学习参考使用，不支持交易，若交易产生后果，与本网站无关
          </Footer>
        </Content>
      </Layout>
    </Layout>
  );
};

export default AppLayout;
