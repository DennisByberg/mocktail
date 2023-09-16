import "./Header.scss";
import cocktailPNG from "../../images/cocktail.png";
import { useState } from "react";
import Hamburger from "../Hamburger/Hamburger";

function Header() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const headerText = "Mark's To-Drink List";

  return (
    <header>
      <img src={cocktailPNG} />
      <h1>{headerText}</h1>
      <Hamburger isOpen={isOpen} setIsOpen={setIsOpen} />
    </header>
  );
}
export default Header;
