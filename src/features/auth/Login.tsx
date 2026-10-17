import { Button, Form, Input } from "antd";
import {
  LockOutlined,
  UserOutlined,
  EyeOutlined,
  EyeInvisibleOutlined,
} from "@ant-design/icons";
import "./styles/Login.css";
import type { loginType } from "./types/auth";
import useLogin from "./hooks/useLogin";

const Login = () => {
  const { mutate, isPending } = useLogin();

  const onFinish = (values: loginType) => {
    mutate(values);
  };

  return (
    <div className="login-page">
      <div className="login-card">

        {/* Logo */}
        <div className="login-logo">
          CRM
        </div>

        {/* Header */}
        <div className="login-header">
          <h1>Welcome back</h1>
          <p>Login to your CRM account</p>
        </div>

        <Form<loginType>
          layout="vertical"
          onFinish={onFinish}
          initialValues={{
            remember: false,
          }}
        >

          {/* Login */}
          <Form.Item
             label="Username"
             name="username"
            rules={[
              {
                required: true,
                message: "Loginni kiriting",
              },
            ]}
          >
            <Input
              size="large"
              prefix={<UserOutlined />}
              placeholder="Enter your login"
            />
          </Form.Item>

          {/* Password */}
          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Parolni kiriting",
              },
              {
                min: 6,
                message: "Parol kamida 6 ta belgidan iborat bo'lishi kerak",
              },
            ]}
          >
            <Input.Password
              size="large"
              prefix={<LockOutlined />}
              placeholder="Enter your password"
              iconRender={(visible) =>
                visible ? (
                  <EyeOutlined />
                ) : (
                  <EyeInvisibleOutlined />
                )
              }
            />
          </Form.Item>

          

          {/* Button */}
          <Form.Item>
            <Button
              htmlType="submit"
              type="primary"
              size="large"
              block
              className="login-button"
              loading={isPending}
            >
              Log In
            </Button>
          </Form.Item>

        </Form>

        
      </div>
    </div>
  );
};

export default Login;