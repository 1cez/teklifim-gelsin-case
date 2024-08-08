import { CocktailItem } from "@/src/app/interface";

export interface CocktailsSearchProps {
  setCocktails: (cocktails: CocktailItem[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: boolean) => void;
}
