import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { notification, Card } from "antd";
import Meta from "antd/es/card/Meta";
import Login from "@/src/app/components/login/login";
import { addBasketItem } from "@/src/app/redux/slices/basket/basketSlice";
import { CocktailItem } from "@/src/app/interface";
import { CocktailsListProps } from "./interface";

const CocktailsList: React.FC<CocktailsListProps> = ({ cocktails }) => {
  const dispatch = useDispatch();

  const successNotification = () => {
    notification.open({
      message: "Successfully added to cart!",
      description:
        "The cocktail you added has been successfully added to the cart.",
    });
  };

  const handleBasketClick = (cocktail: CocktailItem) => {
    dispatch(addBasketItem(cocktail));
    successNotification();
  };

  return (
    <>
      <ul className="home-cocktails-list">
        {cocktails?.length > 0 &&
          cocktails.map((cocktail) => (
            <li className="home-cocktails-item" key={cocktail.idDrink}>
              <div
                className="card-basket-icon"
                onClick={() => handleBasketClick(cocktail)}
              >
                <HiOutlineShoppingBag />
              </div>
              <Card
                className="home-cocktails-card"
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
          ))}
      </ul>
    </>
  );
};

export default CocktailsList;
