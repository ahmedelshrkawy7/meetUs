import { useUserContext } from "@/context/userContext";
import React, { useContext } from "react";

// Assuming you are using Context to provide user data

const Home = () => {
  const { currentUser } = useUserContext(); // Assuming currentUser is from context

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-xl rounded-lg p-6 w-full sm:w-1/2 md:w-1/3">
        <div className="flex flex-col items-center">
          {/* User Profile Picture */}
          <div className="relative mb-4">
            {currentUser.imageUrl ? (
              <img
                src={currentUser.imageUrl}
                alt={currentUser.name}
                className="w-24 h-24 rounded-full object-cover"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center text-white text-2xl">
                {currentUser.name?.charAt(0)}
              </div>
            )}
          </div>

          {/* User Info */}
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            {currentUser.name}
          </h2>
          <p className="text-gray-600">{currentUser.email}</p>
          <p className="text-gray-500 text-sm mt-2">
            Role: {currentUser.roles.join(", ")}
          </p>
          <p className="text-gray-500 text-sm">
            Organization ID: {currentUser.organizationId}
          </p>
          <p className="text-gray-500 text-sm">Shop ID: {currentUser.shopId}</p>

          {/* Additional user status */}
          <div
            className={`mt-4 px-4 py-2 rounded-md ${
              currentUser.isEmployee
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {currentUser.isEmployee ? "Employee" : "Non-Employee"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
