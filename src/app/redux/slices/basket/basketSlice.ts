import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CocktailItem } from "@/src/app/interface";
import { BasketState } from "./interface";

const initialState: BasketState = {
  isBasketOpen: false,
  selectedBasketItems: [],
};

const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    setBasketModalState(state, action: PayloadAction<boolean>) {
      state.isBasketOpen = action.payload;
    },
    addBasketItem(state, action: PayloadAction<CocktailItem>) {
      const item = action.payload;
      const existingItem = state.selectedBasketItems.find(
        (i) => i.idDrink === item.idDrink
      );

      if (existingItem) {
        existingItem.totalBasketClick =
          (existingItem.totalBasketClick || 0) + 1;
      } else {
        state.selectedBasketItems.push({ ...item, totalBasketClick: 1 });
      }
    },
    resetBasketItems(state) {
      state.selectedBasketItems = [];
    },
  },
});

export const { setBasketModalState, addBasketItem, resetBasketItems } =
  basketSlice.actions;
export default basketSlice.reducer;
