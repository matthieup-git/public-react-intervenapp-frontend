import React, { createContext, useState, useEffect, useContext } from 'react';

const AlertContext = createContext();

export const AlertProvider = ({ children }) => {
  const [alertIsVisible, setAlertIsVisible] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);

  const handleReportSuccess = () => {
    setAlertIsVisible(true);
  };

  useEffect(() => {
    if (alertIsVisible) {
      const timer = setTimeout(() => {
        setIsFadingOut(true);
        setTimeout(() => {
          setAlertIsVisible(false);
          setIsFadingOut(false);
        }, 500);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [alertIsVisible]);

  return (
    <AlertContext.Provider value={{ alertIsVisible, isFadingOut, handleReportSuccess }}>
      {children}
    </AlertContext.Provider>
  );
};

export const useAlert = () => useContext(AlertContext);
