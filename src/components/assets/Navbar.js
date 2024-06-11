import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../store/authSlice";

const LogoutModal = ({ onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-75">
      <div className="bg-white p-6 rounded-md shadow-md">
        <p>Are you sure you want to logout ?</p>
        <div className="flex justify-end mt-4">
          <button
            onClick={onCancel}
            className="text-gray-500 mr-4 hover:text-gray-700"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const isLoggedIn = useSelector((state) => state.auth.user.email !== "");
  const isPremium = useSelector((state) => state.theme.isPremium);

  const handleLogout = () => {
    setShowModal(true);
  };

  const confirmLogout = () => {
    dispatch(logout());
    setShowModal(false);
    navigate("/auth");
  };

  const cancelLogout = () => {
    setShowModal(false);
  };

  return (
    <>
      <nav className="bg-gray-800 w-64 h-full fixed top-0 left-0">
        <div className="flex flex-col items-start p-4 space-y-6">
          <div className="text-white text-2xl font-bold">Expense Tracker</div>
          {isLoggedIn && (
            <Link to="/" className="text-white hover:text-gray-300 font-bold">
              Home
            </Link>
          )}
          {isLoggedIn && (
            <Link
              to="/profile"
              className="text-white hover:text-gray-300  font-bold"
            >
              Profile
            </Link>
          )}
          {isPremium && isLoggedIn &&(
            <Link
              to="/Premium"
              className="text-white hover:text-gray-300  font-bold"
            >
              Premium Features
            </Link>
          )}
          {isLoggedIn && (
            <button
              onClick={handleLogout}
              className="text-white hover:text-gray-300  font-bold"
            >
              Logout
            </button>
          )}
        </div>
      </nav>
      {showModal && (
        <LogoutModal onConfirm={confirmLogout} onCancel={cancelLogout} />
      )}
    </>
  );
};

export default Navbar;
