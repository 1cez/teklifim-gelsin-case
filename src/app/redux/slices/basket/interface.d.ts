import { CocktailItem } from "@/src/app/interface";

export interface BasketState {
  isBasketOpen: boolean;
  selectedBasketItems: CocktailItem[];
}
