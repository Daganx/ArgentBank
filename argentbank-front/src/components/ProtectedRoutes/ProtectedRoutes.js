import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { token } = useSelector((state) => state.auth);
  // Si l'utilisateur n'est pas connecté, redirige vers la page 404
  if (!token) {
    return <Navigate to="/404" replace />;
  }
  // Sinon, rendre le composant enfant (la page profil)
  return children;
};

export default ProtectedRoute;
