import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "./AuthSlice";
import { useNavigate } from "react-router-dom";

export default function SignIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, status, user } = useSelector((state) => state.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (user) {
      navigate(`/profile/${user._id}`, { replace: true });
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(loginUser({ email, password }));

    // Vérifie si la connexion a réussi et redirige vers le profil
    if (loginUser.fulfilled.match(result)) {
      if (result.payload.body && result.payload.body.user) {
        const userId = result.payload.body.user._id;
        navigate(`/profile/${userId}`, { replace: true });
      }
    }
  };

  return (
    <section className="sign-in-content">
      <i className="fa fa-user-circle sign-in-icon"></i>
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit}>
        <div className="input-wrapper">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input-wrapper">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="input-remember">
          <input type="checkbox" id="remember-me" />
          <label htmlFor="remember-me">Remember me</label>
        </div>
        <button
          className="sign-in-button"
          type="submit"
          disabled={status === "loading"}
        >
          {status === "loading" ? "Signing in..." : "Sign In"}
        </button>
      </form>
      {status === "failed" && error && (
        <div className="error-message">
          {error.message ? error.message : "An error occurred"}
        </div>
      )}
    </section>
  );
}
