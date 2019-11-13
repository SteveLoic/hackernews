import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "./../firebase/index";

function Header() {
  const { user, firebase } = useContext(AuthContext);
  return (
    <div className="header">
      <div className="flex">
        <img src="/logo.png" alt="Hooks news" className="logo" />
        <NavLink to="/" className="header-title">
          Hooks news
        </NavLink>
        <NavLink to="new" className="header-link">
          New
        </NavLink>
        <div className="divider">|</div>
        <NavLink to="/top" className="header-link">
          top
        </NavLink>
        <div className="divider">|</div>
        <NavLink to="/search" className="header-link">
          search
        </NavLink>

        {user && (
          <React.Fragment>
            {" "}
            <div className="divider">|</div>
            <NavLink to="/create" className="header-link">
              submit
            </NavLink>
          </React.Fragment>
        )}
      </div>
      <div className="flex">
        {user ? (
          <React.Fragment>
            <div className="header-name">{user.displayName}</div>
            <div className="divider">|</div>
            <div className="header-button" onClick={() => firebase.logout()}>
              logout
            </div>
          </React.Fragment>
        ) : (
          <NavLink to="/login" className="header-link">
            login
          </NavLink>
        )}
      </div>
    </div>
  );
}

export default Header;
