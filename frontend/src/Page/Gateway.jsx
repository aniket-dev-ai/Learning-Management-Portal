import React, { useState } from "react";
import { Button } from "../components/ui/button";

const RazorpayCheckout = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  // Handle Input Change
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  // Fake Purchase Handler
  const handlePurchase = () => {
    
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#1e1e2e] via-[#240046] to-[#3c096c] text-darkText px-4">
      <div className="max-w-md w-full bg-darkBg/70 backdrop-blur-lg border border-primary/50 shadow-xl rounded-lg p-6">
        
        {/* Header */}
        <h1 className="text-3xl font-bold text-primary text-center">💳 Razorpay Checkout</h1>
        
        {/* Form Fields */}
        <div className="mt-6">
          <label className="block text-sm font-medium">👤 Name</label>
          <input type="text" name="name" value={user.name} onChange={handleChange} placeholder="Enter your name"
            className="w-full p-2 mt-1 bg-gray-800 text-white rounded-md border border-gray-600 focus:ring-2 focus:ring-primary" />

          <label className="block text-sm font-medium mt-4">📧 Email</label>
          <input type="email" name="email" value={user.email} onChange={handleChange} placeholder="Enter your email"
            className="w-full p-2 mt-1 bg-gray-800 text-white rounded-md border border-gray-600 focus:ring-2 focus:ring-primary" />

          <label className="block text-sm font-medium mt-4">💳 Card Number</label>
          <input type="text" name="cardNumber" value={user.cardNumber} onChange={handleChange} placeholder="0000 0000 0000 0000"
            className="w-full p-2 mt-1 bg-gray-800 text-white rounded-md border border-gray-600 focus:ring-2 focus:ring-primary" />

          <div className="flex gap-4 mt-4">
            <div className="w-1/2">
              <label className="block text-sm font-medium">📆 Expiry</label>
              <input type="text" name="expiry" value={user.expiry} onChange={handleChange} placeholder="MM/YY"
                className="w-full p-2 mt-1 bg-gray-800 text-white rounded-md border border-gray-600 focus:ring-2 focus:ring-primary" />
            </div>
            <div className="w-1/2">
              <label className="block text-sm font-medium">🔒 CVV</label>
              <input type="password" name="cvv" value={user.cvv} onChange={handleChange} placeholder="***"
                className="w-full p-2 mt-1 bg-gray-800 text-white rounded-md border border-gray-600 focus:ring-2 focus:ring-primary" />
            </div>
          </div>
        </div>

        {/* Purchase Button */}
        <Button onClick={handlePurchase} className="mt-6 w-full bg-green-500 text-darkText py-3 px-6 rounded-md font-medium hover:bg-green-600 transition-colors duration-300">
          🛍️ Purchase Now
        </Button>

      </div>
    </div>
  );
};

export default RazorpayCheckout;
