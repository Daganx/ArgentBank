import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../Features/Auth/AuthSlice"; // Assure-toi que le chemin est correct
import topLogo from "../../assets/img/argentBankLogo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle, faSignOut } from "@fortawesome/free-solid-svg-icons";

export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const handleSignOut = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <nav className="main-nav">
      <Link className="main-nav-logo" to="/">
        <img
          className="main-nav-logo-image"
          src={topLogo}
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </Link>
      <div>
        {user ? (
          // Gestion de la connexion/déconnexion
          <div className="main-nav-item-container">
            <span className="user-name">
              <FontAwesomeIcon icon={faUserCircle} className="fa-user-circle" />
              {user.firstName}
            </span>
            <button className="main-nav-item" onClick={handleSignOut}>
              <FontAwesomeIcon icon={faSignOut} className="fa-sign-out" />
              Sign Out
            </button>
          </div>
        ) : (
          <Link className="main-nav-item" to="/login">
            <FontAwesomeIcon icon={faUserCircle} />
            Sign In
          </Link>
        )}
      </div>
    </nav>
  );
}
