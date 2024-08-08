"use client";

import { useEffect, useState } from "react";
import { Card, Spin } from "antd";
import Meta from "antd/es/card/Meta";
import { HeartFilled } from "@ant-design/icons";
import withAuth from "@/src/app/hoc/with-auth/withAuth";
import { CocktailItem } from "@/src/app/interface";
import "@/src/app/styles/favorite-cocktails/styles.scss";

const FavoriteCocktails = () => {
  const [favoriteCocktails, setFavoriteCocktails] = useState<CocktailItem[]>(
    []
  );
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const storedFavorites = localStorage.getItem("favoriteCocktails");
    if (storedFavorites) {
      setFavoriteCocktails(JSON.parse(storedFavorites));
    }
    setLoading(false);
  }, []);

  const handleHeartClick = (idDrink: string) => {
    setFavoriteCocktails((prev) => {
      const updatedFavorites = prev.filter(
        (cocktail) => cocktail.idDrink !== idDrink
      );
      localStorage.setItem(
        "favoriteCocktails",
        JSON.stringify(updatedFavorites)
      );
      return updatedFavorites;
    });
  };

  if (loading) {
    return <Spin fullscreen={true} />;
  }

  return (
    <div className="saved-cocktails-container">
      <h3>Favorite Cocktails</h3>
      <ul className="saved-cocktails-list">
        {favoriteCocktails.length > 0 ? (
          favoriteCocktails.map((cocktail) => (
            <li className="saved-cocktails-item" key={cocktail.idDrink}>
              <div
                className="card-heart-icon-active"
                onClick={() => handleHeartClick(cocktail.idDrink)}
              >
                <HeartFilled />
              </div>
              <Card
                className="saved-cocktails-card"
                cover={
                  <img alt="drink-img" src={`${cocktail.strDrinkThumb}`} />
                }
              >
                <Meta
                  title={cocktail.strDrink}
                  description={cocktail.strInstructions}
                />
              </Card>
            </li>
          ))
        ) : (
          <p>No favorite cocktails</p>
        )}
      </ul>
    </div>
  );
};

export default withAuth(FavoriteCocktails);
