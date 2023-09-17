import "./Searchbar.scss";
import searchPNG from "../../images/search-interface-symbol.png";

function Searchbar({ setSearchInput }: SearchbarProps) {
  return (
    <div className="searchbar">
      <input
        onChange={(e) => setSearchInput(e.target.value)}
        placeholder="Search alcoholfree drink here..."
        type="text"
      />
      <img src={searchPNG} />
    </div>
  );
}
export default Searchbar;
