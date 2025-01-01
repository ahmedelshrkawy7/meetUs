import React, { createContext, useContext, ReactNode } from "react";

// Define the type for the user object
interface User {
  id: number;
  name: string;
  email: string;
  imageUrl: string | null;
  isEmployee: boolean;
  organizationId: number;
  roles: string[];
  shopId: number;
}

// Define the type for the context value
interface UserContextType {
  currentUser: User;
  setCurrentUser: React.Dispatch<React.SetStateAction<User>>;
}

// Create the context with the appropriate types
const userContext = createContext<UserContextType | undefined>(undefined);

const UserContextProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = React.useState<User>(
    JSON.parse(localStorage.getItem("userData") || "{}")
  );

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
