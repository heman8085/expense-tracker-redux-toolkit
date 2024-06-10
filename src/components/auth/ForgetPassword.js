import React, { useState } from "react";
const ForgetPassword = () => {
  const [passwordResetSent, setPasswordResetSent] = useState(false);
  const [email, setEmail] = useState("");

  const forgetPasswordHandler = async () => {
    try {
      const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyCFNqv0lS8OrTfqM59R86Mrjo0RkGnWdXY`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            requestType: "PASSWORD_RESET",
            email: email,
          }),
        }
      );
      const data = await response.json();
      console.log(" password reset response:", data);
      setPasswordResetSent(true);
       setEmail("")
    } catch (error) {
      console.error("Error sending password reset email:", error);
    }
  };

  return (
    <section className="max-w-md mx-auto mt-8 p-6 bg-gray-800 rounded-lg shadow-md">
      <div className="mb-4">
        <label htmlFor="email" className="block text-gray-300 mb-2">
          Enter the email with which you have registered
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
        />
      </div>
      <div className="flex flex-col items-center space-y-4">
        <button
          onClick={forgetPasswordHandler}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Send Link
        </button>
        {passwordResetSent && <p className="text-white">Password reset email sent!</p>}
      </div>
    </section>
  );
};

export default ForgetPassword;
