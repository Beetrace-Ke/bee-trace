import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const onConnectWalletClick = useCallback(() => {
    navigate("/profile?canisterId=br5f7-7uaaa-aaaaa-qaaca-cai");
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-blue-600">Welcome to Home</h1>
      <p className="text-lg text-gray-700 mt-2">
        This is a simple home page using Tailwind CSS.
      </p>
      <button
        className="mt-4 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 "
        onClick={onConnectWalletClick}
      >
        Get Started
      </button>
    </div>
  );
};

export default Home;
