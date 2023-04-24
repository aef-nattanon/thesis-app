import { Layout, Menu, theme } from 'antd';
import React from 'react';
import { Navigate } from 'react-router-dom';

import NavBar from '../components/NavBar';
import { useAppSelector } from '../hooks';
import { selectToken } from '../slices/AuthSlice';

const { Header, Content, Footer, Sider } = Layout;

export default function PrivateRoute({
  children,
}) {
  const token = useAppSelector(selectToken);
  console.log("==========", token, !token);
  if (!token) {
    return <Navigate to="/login" />;
  }
  return (
    <Layout className='max-h-screen'>
      <NavBar />
      <Layout>

        {/* <Header
          style={{
            padding: 0,
          }}
        /> */}
        <Content
          className="site-layout-background max-h-screen"
          style={{
            minHeight: 280,
          }}>
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}
