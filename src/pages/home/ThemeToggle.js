import { useState } from "react";

const useDarkMode = () => {
  const [mode, setMode] = useState("light");

  const toggleMode = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  return [mode, toggleMode];
};

export default useDarkMode;
