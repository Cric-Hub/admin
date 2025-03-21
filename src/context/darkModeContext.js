import { createContext, useReducer } from "react";
import DarkModeReducer from "./darkModeReducer.js";

const INITIAL_STATE = {
  darkMode: false,
};

export const DarkModeContext = createContext(INITIAL_STATE);

export const DarkModeContextProvider = ({ children }) => {
  const [state, dispatchDarkMode] = useReducer(DarkModeReducer, INITIAL_STATE);

  return (
    <DarkModeContext.Provider value={{ darkMode: state.darkMode, dispatchDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};
