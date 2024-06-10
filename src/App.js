import React, { useState, useEffect } from "react";
import "./App.css";
import "./index.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/assets/Navbar";
import Home from "./components/pages/Home";
import Profile from "./components/pages/UserProfile";
import Auth from "./components/pages/Auth";
import PremiumFeatures from "./components/assets/PremiumFeatures";
import { useSelector } from "react-redux";

const App = () => {
  const isPremium = useSelector((state) => state.theme.isPremium);
  const isLoggedIn = useSelector((state) => state.auth.user.email !== "");
  const isUpdateProfile = useSelector((state) => state.auth.isUpdateProfile);
  const [warning, setWarning] = useState(false);

  useEffect(() => {
    if (isLoggedIn && isUpdateProfile) {
      setWarning(true);
      setTimeout(() => {
        setWarning(false);
      }, 5000);
    }
  }, [isLoggedIn, isUpdateProfile]);

  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/auth/*" element={<Auth />} />
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          {isPremium && <Route path="/premium" element={<PremiumFeatures />} />}
        </Routes>
      </div>
      {warning && (
        <div className="warning">
          Your profile is incomplete. Complete it now !!
        </div>
      )}
    </Router>
  );
};

export default App;
