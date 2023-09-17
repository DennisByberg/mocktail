import "./SearchDrinks.scss";
import { useEffect, useState } from "react";
import notFavoriteStarPNG from "../../images/not-favorite-star.png";
import favoriteStarPNG from "../../images/favorite-star.png";
import { getNonAlcoholicDrinks } from "../../hooks/getNonAlcoholicDrinks";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { addToFavorites, removeFromFavorites } from "../../redux/favoriteSlice";

function SearchDrinks({ searchInput }: SearchDrinksProps) {
  const [drinks, setDrinks] = useState<IDrinks[]>([]);
  const dispatch = useDispatch();
  const favorites = useSelector((state: RootState) => state.favorites);

  useEffect(() => {
    async function fetchNonAlcoholicDrinks() {
      const nonAlcoholicDrinks = await getNonAlcoholicDrinks(
        `${import.meta.env.VITE_MOCKTAIL_URL}`
      );
      setDrinks(nonAlcoholicDrinks);
    }
    fetchNonAlcoholicDrinks();
  }, []);

  // Filter drinks that contain searchInput in strDrink
  const filteredDrinks = drinks.filter((drink) =>
    drink.strDrink.toLowerCase().includes(searchInput.toLowerCase())
  );

  return (
    <div className="search-drinks">
      {filteredDrinks.length > 0 ? (
        <ul className="search-drinks__ul">
          {filteredDrinks.map((drink) => (
            <li className="search-drinks__card" key={drink.idDrink}>
              <img
                className="search-drinks__card-drinkIMG"
                src={drink.strDrinkThumb}
              />
              <p className="search-drinks__card-name">{drink.strDrink}</p>
              <img
                className="search-drinks__card-starPNG"
                src={
                  favorites.includes(drink.idDrink)
                    ? favoriteStarPNG // If it's a favorite, use the favorite star image.
                    : notFavoriteStarPNG // If it's not a favorite, use the not favorite star image.
                }
                onClick={() => {
                  if (favorites.includes(drink.idDrink)) {
                    dispatch(removeFromFavorites(drink.idDrink));
                  } else {
                    dispatch(addToFavorites(drink.idDrink));
                  }
                }}
              />
            </li>
          ))}
        </ul>
      ) : (
        <h2>No Mocktails Available...</h2>
      )}
    </div>
  );
}

export default SearchDrinks;
