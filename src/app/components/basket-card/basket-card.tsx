import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/src/app/redux/store";
import { setLoginModalState } from "@/src/app/redux/slices/auth/authSlice";
import { HeartOutlined, HeartFilled } from "@ant-design/icons";
import Login from "@/src/app/components/login/login";
import { CocktailItem } from "@/src/app/interface";
import { BasketCardProps } from "./interface";
import "@/src/app/styles/basket-card/styles.scss";

const BasketCard: React.FC<BasketCardProps> = ({ data }) => {
  const dispatch = useDispatch();
  const isLogin = useSelector((state: RootState) => state.auth.isLogin);
  const showLoginModal = useSelector((state: RootState) => state.auth.isLogin);

  const [favoritedCocktails, setFavoritedCocktails] = useState<CocktailItem[]>(
    []
  );
  const [favoriteIconClicked, setFavoriteIconClicked] = useState(false);

  const handleHeartClick = (cocktail: CocktailItem) => {
    if (!isLogin) {
      dispatch(setLoginModalState(true));
      setFavoriteIconClicked(true);
      return;
    }

    setFavoritedCocktails((prev) => {
      const isFavorited = prev.some((fav) => fav.idDrink === cocktail.idDrink);
      let newFavorites;

      if (isFavorited) {
        newFavorites = prev.filter((fav) => fav.idDrink !== cocktail.idDrink);
      } else {
        newFavorites = [...prev, cocktail];
      }

      localStorage.setItem("favoriteCocktails", JSON.stringify(newFavorites));
      return newFavorites;
    });
  };

  useEffect(() => {
    const storedFavorites = localStorage.getItem("favoriteCocktails");
    if (storedFavorites) {
      setFavoritedCocktails(JSON.parse(storedFavorites));
    }
  }, []);

  return (
    <div className="basket-card-container">
      {favoriteIconClicked && !showLoginModal && <Login />}
      <div className="basket-card-thumbnail">
        <img
          className="basket-card-thumbnail-img"
          src={data?.strDrinkThumb}
          alt={data?.strDrink}
        />
        <span className="basket-card-count">{data?.totalBasketClick}x</span>
      </div>
      <div className="basket-card-info">
        <div className="basket-card-title">{data?.strDrink}</div>
        <div className="basket-card-description">
          <p>{data?.strInstructions}</p>
        </div>
        <div
          className={`basket-card-heart-icon ${
            favoritedCocktails.some((fav) => fav.idDrink === data.idDrink)
              ? "basket-card-heart-icon-active"
              : ""
          }`}
          onClick={() => handleHeartClick(data)}
        >
          {favoritedCocktails.some((fav) => fav.idDrink === data.idDrink) ? (
            <HeartFilled />
          ) : (
            <HeartOutlined />
          )}
        </div>
      </div>
    </div>
  );
};

export default BasketCard;
