import { useSelector } from "react-redux";
import "./FavoritesList.scss";
import { RootState } from "../../redux/store";
import { useEffect, useState } from "react";
import { getNonAlcoholicDrinks } from "../../hooks/getNonAlcoholicDrinks";
import notFavoriteStarPNG from "../../images/not-favorite-star.png";
import favoriteStarPNG from "../../images/favorite-star.png";
import { addToFavorites, removeFromFavorites } from "../../redux/favoriteSlice";
import { useDispatch } from "react-redux";

function FavoritesList() {
  const favorites = useSelector((state: RootState) => state.favorites);
  console.log(favorites);
  const dispatch = useDispatch();

  const [filteredDrinks, setFilteredDrinks] = useState<IDrinks[]>([]);

  useEffect(() => {
    async function fetchNonAlcoholicDrinks() {
      const nonAlcoholicDrinks = await getNonAlcoholicDrinks(
        `${import.meta.env.VITE_MOCKTAIL_URL}`
      );

      // Filter nonAlcoholicDrinks based on the favorites
      const drinksInFavorites = nonAlcoholicDrinks.filter((drink) =>
        favorites.includes(drink.idDrink)
      );

      setFilteredDrinks(drinksInFavorites);
    }
    fetchNonAlcoholicDrinks();
  }, [favorites]);

  return (
    <div className="favorites-list">
      {filteredDrinks.length > 0 ? (
        <ul className="favorites-list__ul">
          {filteredDrinks.map((drink) => (
            <li className="favorites-list__card" key={drink.idDrink}>
              <section className="favorites-list__card-top-section">
                <img
                  className="favorites-list__card-drinkIMG"
                  src={drink.strDrinkThumb}
                  alt={drink.strDrink}
                />
                <p className="favorites-list__card-name">{drink.strDrink}</p>
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
              </section>
              <section className="favorites-list__card-bottom-section">
                <label htmlFor="completed-checkbox">Mark As Completed</label>
                <input type="checkbox" id="completed-checkbox" />
              </section>
            </li>
          ))}
        </ul>
      ) : (
        <h2>No Favorites Added Yet.</h2>
      )}
    </div>
  );
}

export default FavoritesList;
