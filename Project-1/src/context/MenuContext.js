import React, { createContext, useState } from 'react';

export const MenuContext = createContext();

export const MenuProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  return (
    <MenuContext.Provider value={{ user, setUser }}>
      {children}
    </MenuContext.Provider>
  );
};