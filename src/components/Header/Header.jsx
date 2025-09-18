import React from "react";
import Logo from "../../../src/Images/VectorTitle.svg";

/**

 Si el usuario está logueado: muestra email y botón de Sign Out.
 Si NO está logueado: muestra links a Sign In y Sign Up.
 */

const Header = ({ isLoggedIn, userEmail, onLogout }) => {
  return (
    <header className="header">
      <img src={Logo} alt="Around the U.S logo" className="logo header__logo" />
      <div className="header__user-info">
        {isLoggedIn ? (
          <>
            <span className="header__email">{userEmail}</span>
            <button className="header__logout-btn" onClick={onLogout}>
              Sign Out
            </button>
          </>
        ) : (
          <>
            <Link to="/signup" className="header__logout-btn">
              Regístrate
            </Link>
            <Link to="/signin" className="header__logout-btn">
              Sign In
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
