import { useSelector } from "react-redux";
import "./Navigation.scss";

import { useNavigate } from "react-router-dom";
import { RootState } from "../../redux/store";
function Navigation() {
  const favorites = useSelector((state: RootState) => state.favorites);
  console.log(favorites);
  const navigate = useNavigate();
  return (
    <div className="navigation">
      <ul className="navigation__links">
        <li onClick={() => navigate("/")} className="navigation__link">
          Home
        </li>
        <li onClick={() => navigate("/Favorites")} className="navigation__link">
          Favorites (
          <span className="navigation__favorites-number">
            {" "}
            {favorites.length}{" "}
          </span>
          )
        </li>
      </ul>
    </div>
  );
}
export default Navigation;
