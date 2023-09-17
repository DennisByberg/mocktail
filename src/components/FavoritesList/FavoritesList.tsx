import { useSelector } from "react-redux";
import "./FavoritesList.scss";
import { RootState } from "../../redux/store";
import { useEffect, useState } from "react";
import { getNonAlcoholicDrinks } from "../../hooks/getNonAlcoholicDrinks";
import notFavoriteStarPNG from "../../images/not-favorite-star.png";
import favoriteStarPNG from "../../images/favorite-star.png";
import {
  addToFavorites,
  clearFavorites,
  removeFromFavorites,
} from "../../redux/favoriteSlice";
import { useDispatch } from "react-redux";
import {
  saveToLocalStorage,
  loadFromLocalStorage,
} from "../../helpers/localStorage";

function FavoritesList() {
  const favorites = useSelector((state: RootState) => state.favorites);
  const dispatch = useDispatch();

  const [filteredDrinks, setFilteredDrinks] = useState<IDrinks[]>([]);
  const [completedDrinks, setCompletedDrinks] = useState<string[]>([]);

  // Load completed drinks from local storage when the component initializes
  useEffect(() => {
    const storedCompletedDrinks =
      loadFromLocalStorage<string[]>("completedDrinks");
    if (storedCompletedDrinks) {
      setCompletedDrinks(storedCompletedDrinks);
    }
  }, []);

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

      // Save completed drinks to local storage after the state has been updated
      saveToLocalStorage("completedDrinks", completedDrinks);
    }
    fetchNonAlcoholicDrinks();
  }, [favorites, completedDrinks]);

  // Function to handle checkbox change
  const handleCheckboxChange = (drinkId: string) => {
    if (completedDrinks.includes(drinkId)) {
      setCompletedDrinks((prevCompletedDrinks) =>
        prevCompletedDrinks.filter((id) => id !== drinkId)
      );
    } else {
      setCompletedDrinks((prevCompletedDrinks) => [
        ...prevCompletedDrinks,
        drinkId,
      ]);
    }
  };

  function handleClearFavorites() {
    dispatch(clearFavorites());
    setFilteredDrinks([]);
    setCompletedDrinks([]);
    saveToLocalStorage("completedDrinks", []);
  }

  return (
    <div className="favorites-list">
      {filteredDrinks.length ? (
        <button
          onClick={handleClearFavorites}
          className="favorites-list__clear-list-btn"
        >
          Clear Favorites
        </button>
      ) : (
        ""
      )}

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
                <p
                  className={`favorites-list__card-name ${
                    completedDrinks.includes(drink.idDrink) ? "completed" : ""
                  }`}
                >
                  {drink.strDrink}
                </p>
                <img
                  className="favorites-list__card-starPNG"
                  src={
                    favorites.includes(drink.idDrink)
                      ? favoriteStarPNG
                      : notFavoriteStarPNG
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
                <label htmlFor={`completed-checkbox-${drink.idDrink}`}>
                  Mark As Completed
                </label>
                <input
                  type="checkbox"
                  id={`completed-checkbox-${drink.idDrink}`}
                  checked={completedDrinks.includes(drink.idDrink)}
                  onChange={() => handleCheckboxChange(drink.idDrink)}
                />
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
