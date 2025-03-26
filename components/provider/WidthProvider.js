import React, { createContext, useState, useEffect, useContext } from 'react';

const WidthContext = createContext();

export const WidthProvider = ({ children }) => {
    const [isMobile, setIsMobile] = useState(true);
    console.log(isMobile)

    const checkWindowSize = () => {
      if (typeof window !== "undefined") {
        const windowWidth = window.innerWidth;
        setIsMobile(windowWidth <= 1024);
      }
    };
  
    useEffect(() => {
      checkWindowSize(); // Vérifie la taille de la fenêtre au montage initial
      if (typeof window !== "undefined") {
        window.addEventListener("resize", checkWindowSize);
        return () => {
          window.removeEventListener("resize", checkWindowSize);
        };
      }
    }, []);

  return (
    <WidthContext.Provider value={{ isMobile }}>
      {children}
    </WidthContext.Provider>
  );
};

export const useWidth = () => useContext(WidthContext);
