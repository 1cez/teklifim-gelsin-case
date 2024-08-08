import { useSelector } from "react-redux";
import { RootState } from "@/src/app/redux/store";
import BasketCard from "@/src/app/components/basket-card/basket-card";

const Basket = () => {
  const basketItems = useSelector(
    (state: RootState) => state.basket.selectedBasketItems
  );

  return (
    <div className="basket-wrapper">
      {basketItems.length > 0 &&
        basketItems.map((basketItem, index) => (
          <div>
            <h3 key={index}>
              <BasketCard data={basketItem} />
            </h3>
          </div>
        ))}
    </div>
  );
};

export default Basket;
