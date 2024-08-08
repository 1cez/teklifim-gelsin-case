"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Spin } from "antd";
import CocktailsList from "./components/cocktails/list/cocktails-list";
import CocktailsSearch from "./components/cocktails/search/cocktails-search";
import { endpoints } from "./api/endpoints";
import { CocktailItem } from "./interface";
import "./styles/home/styles.scss";

export default function Home() {
  const [cocktails, setCocktails] = useState<CocktailItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  const getAllCocktails = async () => {
    try {
      const response = await axios.get(endpoints.getAllCocktails);
      setCocktails(response.data.drinks);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllCocktails();
  }, []);

  return (
    <div className="home-container">
      <CocktailsSearch
        setCocktails={setCocktails}
        setLoading={setLoading}
        setError={setError}
      />
      <h3>Cocktail List</h3>
      {loading && <Spin fullscreen={true} />}
      {Array.isArray(cocktails) && cocktails.length > 0 && !error ? (
        <CocktailsList cocktails={cocktails} />
      ) : (
        <p>The cocktail you were looking for was not found.</p>
      )}
    </div>
  );
}
