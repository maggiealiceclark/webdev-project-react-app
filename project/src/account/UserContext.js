import React, { createContext, useState, useContext } from "react";

// Create a new context
const UserContext = createContext();

// Create a provider component
export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [favoriteArtist, setFavoriteArtist] = useState('');

  return (
    <UserContext.Provider value={{ user, setUser, favoriteArtist, setFavoriteArtist }}>
      {children}
    </UserContext.Provider>
  );
}

// Create a custom hook for using the user context
export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
