import FavoritesList from "../../components/FavoritesList/FavoritesList";
import Header from "../../components/Header/Header";
import "./FavoritesPage.scss";

function FavoritesPage() {
  return (
    <div className="favorites-page">
      <Header />
      <FavoritesList />
    </div>
  );
}
export default FavoritesPage;
