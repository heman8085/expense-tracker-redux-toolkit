import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  sendVerificationEmail,
  toggleUpdateProfile,
  updateProfile,
} from "../store/authSlice";

const Profile = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const verificationSent = useSelector((state) => state.auth.verificationSent);
  const isUpdateProfile = useSelector((state) => state.auth.isUpdateProfile);
  const [fullName, setFullName] = useState(user.displayName || "");
  const [profilePhoto, setProfilePhoto] = useState(user.photoUrl || "");

  const handleSendVerificationEmail = () => {
    dispatch(sendVerificationEmail());
  };

  const handleProfileUpdate = () => {
    dispatch(toggleUpdateProfile());
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    dispatch(updateProfile({ fullName, profilePhoto }));
  };

  return (
    <div className="flex-col md:flex-row w-auto h-full justify-center items-center ml-64 p-4">
      <div className="p-6 bg-gray-800 rounded-md shadow-md text-white w-auto md:w-auto">
        <div className="flex flex-col items-center">
          <img
            src={user.photoUrl || "https://via.placeholder.com/200"}
            alt="Profile"
            height={200}
            width={200}
            className=""
          />
          <h2 className="text-2xl font-semibold mb-2">
            {user.displayName || "User"}
          </h2>
          <h3 className="text-lg mb-4">{user.email}</h3>
          <div>
            {verificationSent ? (
              <span className="text-green-400 mb-4">
                Verification email sent!
              </span>
            ) : (
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md mb-4"
                onClick={handleSendVerificationEmail}
              >
                Verify
              </button>
            )}
          </div>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
            onClick={handleProfileUpdate}
          >
            Update Profile
          </button>
        </div>
        {isUpdateProfile && (
          <div className="bg-gray-700 p-6 rounded-md shadow-md text-white mt-4">
            <form className="space-y-4" onSubmit={handleUpdate}>
              <div className="flex flex-col space-y-2">
                <label htmlFor="name" className="text-gray-300">
                  Full name:
                </label>
                <input
                  type="text"
                  id="name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full p-2 bg-gray-600 border border-gray-500 rounded-md text-white"
                  required
                />
              </div>
              <div className="flex flex-col space-y-2">
                <label htmlFor="photo" className="text-gray-300">
                  Profile Photo URL:
                </label>
                <input
                  type="text"
                  id="photo"
                  value={profilePhoto}
                  onChange={(e) => setProfilePhoto(e.target.value)}
                  className="w-full p-2 bg-gray-600 border border-gray-500 rounded-md text-white"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
