import { createContext, useContext, useState, useEffect } from "react";

const GlobalContext = createContext();

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};

const getInitialTheme = () => {
  let themeStatus = false;
  if (localStorage.getItem("theme")) {
    // there is value in storage assign it to the object
    themeStatus = JSON.parse(localStorage.getItem("theme"));
  }

  return themeStatus;
};

const flipTheme = (themeStatus) => {
  //  add the dark theme class to the body
  const body = document.querySelector("body");
  body.classList.toggle("dark-theme", themeStatus);
  localStorage.setItem("theme", JSON.stringify(themeStatus));
};

const AppContext = (props) => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [searchTerm, setSearchTerm] = useState("cat");

  //  use click
  const toggleDarkTheme = () => {
    const newDarkTheme = !isDarkTheme;
    setIsDarkTheme(newDarkTheme);
    flipTheme(newDarkTheme);
  };

  //  initial load
  useEffect(() => {
    const state = getInitialTheme();
    setIsDarkTheme(state);
    flipTheme(state);
  }, []);

  return (
    <GlobalContext.Provider
      value={{ isDarkTheme, toggleDarkTheme, searchTerm, setSearchTerm }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};
export default AppContext;
