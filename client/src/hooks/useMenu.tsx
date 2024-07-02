import React, { createContext, useState, useContext } from "react";

interface MenuContextData {
  ToggleMenu(toggleState: boolean): void;
  toggleState: boolean;
}

interface MenuProviderProps {
  children: React.ReactNode;
}

const UseMenu = createContext<MenuContextData>({} as MenuContextData);

const MenuProvider: React.FC<MenuProviderProps> = ({ children }) => {
  const [toggleState, setToggleState] = useState(false);

  const ToggleMenu = () => {
    return setToggleState(!toggleState);
  };

  return (
    <UseMenu.Provider value={{ ToggleMenu, toggleState }}>
      {children}
    </UseMenu.Provider>
  );
};

function useMenu(): MenuContextData {
  const context = useContext(UseMenu);

  if (!context) {
    throw new Error("useMenu must be used within a MenuProvider");
  }

  return context;
}

export { MenuProvider, useMenu };
