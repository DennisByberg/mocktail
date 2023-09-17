import "./SearchDrinks.scss";
import { useEffect, useState } from "react";
import notFavoriteStarPNG from "../../images/not-favorite-star.png";
import { getNonAlcoholicDrinks } from "../../hooks/getNonAlcoholicDrinks";

function SearchDrinks({ searchInput }: SearchDrinksProps) {
  const [drinks, setDrinks] = useState<IDrinks[]>([]);

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
                src={notFavoriteStarPNG}
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
