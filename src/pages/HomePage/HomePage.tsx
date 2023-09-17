import { useState } from "react";
import Header from "../../components/Header/Header";
import SearchDrinks from "../../components/SearchDrinks/SearchDrinks";
import Searchbar from "../../components/Searchbar/Searchbar";
import "./HomePage.scss";

function HomePage() {
  const [searchInput, setSearchInput] = useState<string>("");

  return (
    <div className="home-page">
      <Header />
      <Searchbar setSearchInput={setSearchInput} />
      <SearchDrinks searchInput={searchInput} />
    </div>
  );
}
export default HomePage;
