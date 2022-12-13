import { HomeOutlined, LogoutOutlined, UploadOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import React, { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../hooks';
import { selectToken, singOut } from '../slices/AuthSlice';

const { Sider } = Layout;

const NavBar: React.FC = () => {
  const dispatch = useAppDispatch();
  const [collapsed, setCollapsed] = useState(false);
  const token = useAppSelector(selectToken);
  console.log("----", token);
  const onCollapse = useCallback(() => {
    setCollapsed(!collapsed);
  }, [collapsed]);

  const items = [
    { label: <Link to="/">หน้าหลัก</Link>, key: "1", icon: <HomeOutlined /> },
    {
      label: <Link to="/houses">บ้าน</Link>,
      key: "/",
      icon: <UploadOutlined />,
    },
    {
      label: <Link to="/about">About</Link>,
      key: "_",
      icon: <VideoCameraOutlined />,
    },
    {
      label: "Sign out",
      key: "4",
      icon: <LogoutOutlined />,
      onClick: () => dispatch(singOut()),
    },
  ];
  return (
    <>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <div className="logo" />
        <Menu theme="dark" mode="inline" items={items} />
      </Sider>

      {/* <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }}>
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: toggle,
            },
          )}
        </Header>
      </Layout> */}
    </>
  );
};
export default NavBar;
