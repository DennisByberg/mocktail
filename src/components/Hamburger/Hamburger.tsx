import Navigation from "../Navigation/Navigation";
import "./Hamburger.scss";

interface HamburgerProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function Hamburger({ isOpen, setIsOpen }: HamburgerProps) {
  function handleClick(): void {
    setIsOpen(!isOpen);
  }

  return (
    <div>
      <section
        className={`hamburger-menu ${isOpen ? "hamburger-menu--open" : ""}`}
        onClick={handleClick}
      >
        <span className="hamburger-menu__line"></span>
        <span className="hamburger-menu__line"></span>
        <span className="hamburger-menu__line"></span>
      </section>
      <section>{isOpen ? <Navigation /> : ""}</section>
    </div>
  );
}

export default Hamburger;
