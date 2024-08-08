"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/src/app/redux/store";
import { setLoginState } from "@/src/app/redux/slices/auth/authSlice";
import { Drawer } from "antd";
import {
  HiOutlineBookmark,
  HiOutlineLogout,
  HiOutlineShoppingCart,
} from "react-icons/hi";
import Logo from "@/public/assets/logo.png";
import { routes } from "@/src/app/routes";
import {
  setBasketModalState,
  resetBasketItems,
} from "@/src/app/redux/slices/basket/basketSlice";
import Basket from "@/src/app/components/basket/basket";
import "@/src/app/styles/header/styles.scss";

const Header = () => {
  const dispatch = useDispatch();
  const basket = useSelector((state: RootState) => state.basket);
  const isLogin = useSelector((state: RootState) => state.auth.isLogin);

  const [scrolled, setScrolled] = useState(false);

  const handleBasketModal = () => {
    dispatch(setBasketModalState(!basket.isBasketOpen));
  };

  const onClose = () => {
    dispatch(setBasketModalState(false));
  };

  const handleLogout = () => {
    dispatch(setLoginState(false));
    dispatch(resetBasketItems());
    localStorage.removeItem("favoriteCocktails");
  };

  const renderDrawer = () => {
    return (
      <Drawer
        title="Cocktails Basket"
        placement={"left"}
        closable={false}
        onClose={onClose}
        open={basket.isBasketOpen}
        key={"left"}
      >
        <Basket />
      </Drawer>
    );
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className={`header-container ${scrolled ? "header-scrolled" : ""}`}>
      {renderDrawer()}
      <div className="header-logo">
        <Link href={routes.home}>
          <Image src={Logo} alt="cocktail-icon" width={0} height={0} />
        </Link>
      </div>
      <div className="header-action">
        <div className="header-action-basket">
          <HiOutlineShoppingCart
            onClick={handleBasketModal}
            className="header-action-basket-icon"
          />
        </div>
        <Link href={routes.favoriteCocktails}>
          <div className="header-saved">
            <HiOutlineBookmark className="header-saved-icon" />
          </div>
        </Link>
        {isLogin && (
          <HiOutlineLogout
            onClick={handleLogout}
            className="header-logout-icon"
          />
        )}
      </div>
    </div>
  );
};

export default Header;
