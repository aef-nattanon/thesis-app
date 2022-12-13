import { Button, Checkbox, Form, Input, Layout } from "antd";
import React, { useState } from "react";
import { Navigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../hooks";
import { selectToken, singIn } from "../slices/AuthSlice";

const { Header, Content, Footer } = Layout;

export interface UserData {
  password: string;
  username: string;
  remember: boolean;
}
function SingIn() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const onFinish = async (values: UserData) => {
    setLoading(true);
    if (
      (values.username === "demo1" || values.password === "demo2") &&
      values.password === "demo"
    ) {
      await new Promise((r) => setTimeout(r, 1000));
      setError("");
      dispatch(singIn({ name: values.username, token: "1212" }));
    } else {
      setError(" couldn't find an account");
    }
    setLoading(false);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const token = useAppSelector(selectToken);
  console.log("is token", token);

  if (token) {
    console.log("have token", token);
    return <Navigate to="/" />;
  }

  return (
    <Content className="h-screen flex items-center place-content-center">
      <div className="bg-orange-200 p-3">
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off">
          <Form.Item
            label="Username"
            name="username"
            rules={[
              { required: true, message: "Please input your username!" },
            ]}>
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              { required: true, message: "Please input your password!" },
            ]}>
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{ offset: 8, span: 16 }}>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button
              loading={loading}
              style={{ backgroundColor: "#1890ff" }}
              type="primary"
              htmlType="submit">
              Sing In
            </Button>
          </Form.Item>
        </Form>
        <span className="text-red-600">{error && error}</span>
      </div>
    </Content>
  );
}

export default SingIn;
