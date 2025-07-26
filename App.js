import { useEffect, useState } from 'react';
import Navigation from './app/navigation';
import { StatusBar } from 'expo-status-bar';
import './global.css';
import './i18n'; // Initialize i18n
import RegistrationModal from './components/RegistrationModal';
import { UserStorage } from './utils/UserStorage';
import { RegistrationContext } from './context/RegistrationContext.js';

export default function App() {
  const [showRegistration, setShowRegistration] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkUserRegistration();
  }, []);

  const checkUserRegistration = async () => {
    try {
      const isRegistered = await UserStorage.isUserRegistered();
      if (!isRegistered) {
        setShowRegistration(true);
      }
    } catch (error) {
      console.error('Error checking registration:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegistrationComplete = () => {
    setShowRegistration(false);
  };

  if (isLoading) {
    // You can add a splash screen component here
    return null;
  }

  return (
    <RegistrationContext.Provider value={{ isRegistrationModalOpen: showRegistration }}>
      <Navigation />
      <StatusBar style="auto" />
      <RegistrationModal 
        visible={showRegistration}
        onComplete={handleRegistrationComplete}
      />
    </RegistrationContext.Provider>
  );
}
