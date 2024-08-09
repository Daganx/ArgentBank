import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile } from "../Features/Auth/AuthSlice";
import UserHeader from "../components/User-Header/UserHeader";
import UserTransactions from "../components/User-Transactions/UserTransactions";

const Profile = () => {
  const dispatch = useDispatch();
  const { user, token, status, error } = useSelector((state) => state.auth);

  useEffect(() => {
    if (token && !user) {
      console.log("Fetching user profile...");
      dispatch(fetchUserProfile());
    }
  }, [dispatch, token, user]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (error) {
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
