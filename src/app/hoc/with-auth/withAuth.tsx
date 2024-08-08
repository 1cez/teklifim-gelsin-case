"use client";

import React, { ComponentType } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/src/app/redux/store";
import Login from "@/src/app/components/login/login";

const withAuth = <P extends object>(
  WrappedComponent: ComponentType<P>
): React.FC<P> => {
  const authControl: React.FC<P> = (props) => {
    const loginSelector = useSelector((state: RootState) => state.auth.isLogin);
    const isLogin = loginSelector;

    if (!isLogin) {
      return <Login />;
    }

    return <WrappedComponent {...props} />;
  };

  return authControl;
};

export default withAuth;
