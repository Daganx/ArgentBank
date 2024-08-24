import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateUserProfile } from "../../Features/Auth/AuthSlice";

const UserHeader = ({ user }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const dispatch = useDispatch();

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    // On click dispatch the thunk to update the user's profile
    dispatch(updateUserProfile({ firstName, lastName }));
    setIsEditing(false);
  };

  const handleCancelClick = () => {
    setFirstName(user.firstName);
    setLastName(user.lastName);
    setIsEditing(false);
  };

  return (
    <header className="header">
      <h1>
        <p className="welcome">Welcome Back</p> <br />
        {isEditing ? (
          <div className="input-container">
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
        ) : (
          `${user.firstName} ${user.lastName}`
        )}
      </h1>
      {isEditing ? (
        <div className="button-container">
          <button className="save-button" onClick={handleSaveClick}>
            Save
          </button>
          <button className="cancel-button" onClick={handleCancelClick}>
            Cancel
          </button>
        </div>
      ) : (
        <button className="edit-button" onClick={handleEditClick}>
          Edit Name
        </button>
      )}
    </header>
  );
};

export default UserHeader;
