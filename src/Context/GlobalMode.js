import React from "react";

export const GlobalContext = React.createContext();

export const GlobalStorage = ({ children }) => {
  const [mode, setMode] = React.useState(() => {
    const mode = window.localStorage.getItem("mode");

    if (mode && mode === "dark") return true;
    else return false;
  });

  return (
    <GlobalContext.Provider value={{ mode, setMode }}>
      {children}
    </GlobalContext.Provider>
  );
};
