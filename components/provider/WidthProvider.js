import React, { createContext, useState, useEffect, useContext } from 'react';

const WidthContext = createContext();

export const WidthProvider = ({ children }) => {
    const [isDesktop, setIsDesktop] = useState(true);

    const checkWindowSize = () => {
      if (typeof window !== "undefined") {
        const windowWidth = window.innerWidth;
        setIsDesktop(windowWidth >= 1024);
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
    <WidthContext.Provider value={{ isDesktop }}>
      {children}
    </WidthContext.Provider>
  );
};

export const useWidth = () => useContext(WidthContext);
