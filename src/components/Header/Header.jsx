
import Logo from "../../../src/Images/VectorTitle.svg";


const Header = () => {
  return (  <header className="header">
         <img
            src={Logo}
           alt="Around the U.S logo"
           className="logo header__logo"
         />
       </header> );
}
 
export default Header;