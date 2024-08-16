import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { fetchUserProfile } from "../Features/Auth/AuthSlice";
import UserHeader from "../components/User-Header/UserHeader";
import UserTransactions from "../components/User-Transactions/UserTransactions";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userId } = useParams();
  const { user, token, status, error } = useSelector((state) => state.auth);

  useEffect(() => {
    if (token && !user) {
      dispatch(fetchUserProfile());
    } else if (user && user._id !== userId) {
      // Redirige vers la page 404 si l'ID dans l'URL ne correspond pas à l'utilisateur connecté
      navigate("/404", { replace: true });
    }
  }, [dispatch, token, user, userId, navigate]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed" && error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <main className="main bg-dark user-page">
        <UserHeader user={user} />
        <UserTransactions />
      </main>
    </>
  );
};

export default Profile;
