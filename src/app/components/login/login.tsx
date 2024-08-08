"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { Input, Button, Alert } from "antd";
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  UserOutlined,
} from "@ant-design/icons";
import { routes } from "@/src/app/routes";
import Logo from "@/public/assets/logo.png";
import {
  setLoginState,
  setLoginModalState,
} from "@/src/app/redux/slices/auth/authSlice";
import "@/src/app/styles/login/styles.scss";

const Login = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const initialUser = {
    username: "admin",
    password: "123",
  };

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const handleLogin = () => {
    if (
      username === initialUser.username &&
      password === initialUser.password
    ) {
      dispatch(setLoginState(true));
      dispatch(setLoginModalState(true));
      router.push(routes.home);
    } else {
      setError("User not found");
      dispatch(setLoginState(false));
    }
  };

  return (
    <div className="user-login-container">
      <div className="user-login-wrapper">
        <div className="user-login-logo">
          <Image src={Logo} alt="user-login-logo" width={0} height={0} />
        </div>
        <Input
          placeholder="Enter your username"
          prefix={<UserOutlined />}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input.Password
          placeholder="Enter your password"
          iconRender={(visible) =>
            visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
          }
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <Alert message={error} type="error" showIcon />}
        <div className="user-login-action">
          <Button type="primary" onClick={handleLogin}>
            Login
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
