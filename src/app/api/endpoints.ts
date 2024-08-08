export const endpoints = {
  getAllCocktails: "/api/cocktails/search.php?f=a",
  getCocktailByName: (name: string) => `/api/cocktails/search.php?s=${name}`,
};
