import React, { useState, createContext } from "react";

const myContext = createContext();

export const MyProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);

  return (
    <myContext.Provider value={{ loading, setLoading }}>
      {children}
    </myContext.Provider>
  );
};

export default myContext;
