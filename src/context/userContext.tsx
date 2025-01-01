import React, { createContext, useContext, ReactNode } from "react";

// Define the type for the user object
interface User {
  // Define properties of the user here (e.g., name, email, etc.)
  name?: string;
  email?: string;
  // Add more fields as needed
}

// Define the type for the context value
interface UserContextType {
  currentUser: User;
  setCurrentUser: React.Dispatch<React.SetStateAction<User>>;
}

// Create the context with the appropriate types
const userContext = createContext<UserContextType | undefined>(undefined);

const UserContextProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = React.useState<User>({});

  return (
    <userContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </userContext.Provider>
  );
};

// Custom hook to access the context
export const useUserContext = () => {
  const context = useContext(userContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserContextProvider");
  }
  return context;
};

export default UserContextProvider;
