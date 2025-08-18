// src/components/LoadingContext.jsx
import React, { createContext, useContext, useState } from 'react';

const LoadingContext = createContext(null);

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
};

export const LoadingProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  
  const startLoading = () => {
    setIsLoading(true);
    // Auto-stop loading after 3-4 seconds
    const loadingTime = Math.random() * 1000 + 3000; // 3-4 seconds
    setTimeout(() => {
      setIsLoading(false);
    }, loadingTime);
  };
  
  const stopLoading = () => setIsLoading(false);

  const value = {
    isLoading,
    startLoading,
    stopLoading
  };

  return (
    <LoadingContext.Provider value={value}>
      {children}
    </LoadingContext.Provider>
  );
};