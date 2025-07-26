import { createContext, useContext } from 'react';

const RegistrationContext = createContext({
  isRegistrationModalOpen: false
});

export { RegistrationContext };

export const useRegistration = () => {
  const context = useContext(RegistrationContext);
  if (!context) {
    throw new Error('useRegistration must be used within a RegistrationContext.Provider');
  }
  return context;
};
