import React from "react";
import axios from "axios";
import { Input } from "antd";
import { endpoints } from "@/src/app/api/endpoints";
import "@/src/app/styles/search/styles.scss";
import { CocktailsSearchProps } from "./interface";

const { Search } = Input;

const CocktailsSearch: React.FC<CocktailsSearchProps> = ({
  setCocktails,
  setLoading,
  setError,
}) => {
  const onSearch = async (val: string) => {
    setLoading(true);
    try {
      const response = await axios.get(endpoints.getCocktailByName(val));
      setCocktails(response.data.drinks);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home-search-container">
      <Search
        className="home-search-input"
        placeholder="Enter cocktail name."
        onSearch={onSearch}
      />
    </div>
  );
};

export default CocktailsSearch;
