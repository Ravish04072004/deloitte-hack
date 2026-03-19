import React, { createContext, useState, useEffect } from 'react';

export const DemoContext = createContext();

export const DemoProvider = ({ children }) => {
  const [onboardingDone, setOnboardingDone] = useState(() => {
    const stored = localStorage.getItem('app_onboarding_done');
    return stored ? JSON.parse(stored) : false;
  });

  const [currentDemoView, setCurrentDemoView] = useState(null);

  useEffect(() => {
    localStorage.setItem('app_onboarding_done', JSON.stringify(onboardingDone));
  }, [onboardingDone]);

  const skipOnboarding = () => {
    setOnboardingDone(true);
  };

  const resetOnboarding = () => {
    setOnboardingDone(false);
    setCurrentDemoView(null);
  };

  return (
    <DemoContext.Provider
      value={{
        onboardingDone,
        skipOnboarding,
        resetOnboarding,
        currentDemoView,
        setCurrentDemoView,
      }}
    >
      {children}
    </DemoContext.Provider>
  );
};

export const useDemoState = () => {
  const context = React.useContext(DemoContext);
  if (!context) {
    throw new Error('useDemoState must be used within DemoProvider');
  }
  return context;
};
