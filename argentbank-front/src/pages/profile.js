import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile } from "../Features/Auth/AuthSlice";
import { useNavigate, useParams } from "react-router-dom";
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
    }
  }, [dispatch, token, user]);

  useEffect(() => {
    if (user && userId && userId !== user._id) {
      navigate("/404", { replace: true });
    }
  }, [user, userId, navigate]);

  if (status === "loading" || !user) {
    return <div>Loading...</div>;
  }

  if (status === "failed" && error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <main className="main bg-dark user-page">
      <UserHeader user={user} />
      <UserTransactions />
    </main>
  );
};

export default Profile;
