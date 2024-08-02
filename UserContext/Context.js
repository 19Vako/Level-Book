import React, { createContext, useState } from 'react';

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [favorite, setFavorite] = useState({})

  return (
    <UserContext.Provider value={{ user, setUser, favorite, setFavorite }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
