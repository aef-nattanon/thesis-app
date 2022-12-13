import { Layout } from 'antd';
import React from 'react';
import { Navigate } from 'react-router-dom';

import NavBar from '../components/NavBar';
import { useAppSelector } from '../hooks';
import { selectToken } from '../slices/AuthSlice';

const { Header, Sider, Content } = Layout;

export default function PrivateRoute({
  children,
}: {
  children: React.ReactElement | null;
}) {
  const token = useAppSelector(selectToken);
  console.log("==========", token, !token);
  if (!token) {
    return <Navigate to="/login" />;
  }
  return (
    <>
      <NavBar />
      <Content
        className="site-layout-background"
        style={{
          margin: "24px 16px",
          padding: 24,
          minHeight: 280,
        }}>
        {children}
      </Content>
    </>
  );
}
