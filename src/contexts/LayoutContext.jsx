import React, { createContext, useState } from 'react';

export const LayoutContext = createContext();

export const LayoutProvider = ({ children }) => {
  // Change this to 'topBarTitle' and default to an empty string
  const [topBarTitle, setTopBarTitle] = useState('');

  return (
    <LayoutContext.Provider value={{ topBarTitle, setTopBarTitle }}>
      {children}
    </LayoutContext.Provider>
  );
};