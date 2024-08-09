import React from "react";

const UserHeader = ({ user }) => {
  return (
    <header className="header">
      <h1>
        Welcome Back <br />{" "}
        {user ? `${user.firstName} ${user.lastName}` : "Guest"}
      </h1>
      <button className="edit-button">Edit Name</button>
    </header>
  );
};

export default UserHeader;
