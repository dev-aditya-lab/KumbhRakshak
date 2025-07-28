import { useEffect, useState } from 'react';
import Navigation from './app/navigation';
import { StatusBar } from 'expo-status-bar';
import './global.css';
import './i18n'; // Initialize i18n
import RegistrationModal from './components/RegistrationModal';
import UserTypeModal from './components/UserTypeModal';
import VolunteerLoginModal from './components/VolunteerLoginModal';
import { UserStorage } from './utils/UserStorage';
import { RegistrationContext } from './context/RegistrationContext.js';

export default function App() {
  const [showUserTypeSelection, setShowUserTypeSelection] = useState(false);
  const [showRegistration, setShowRegistration] = useState(false);
  const [showVolunteerLogin, setShowVolunteerLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userType, setUserType] = useState(null);

  useEffect(() => {
    checkUserStatus();
  }, []);

  const checkUserStatus = async () => {
    try {
      const isRegistered = await UserStorage.isUserRegistered();
      const savedUserType = await UserStorage.getUserType();
      
      if (!savedUserType) {
        // First time user - show user type selection
        setShowUserTypeSelection(true);
      } else if (savedUserType === 'user' && !isRegistered) {
        // Regular user but not registered - show registration
        setUserType('user');
        setShowRegistration(true);
      } else if (savedUserType === 'volunteer') {
        // Volunteer - check if logged in
        const isVolunteerLoggedIn = await UserStorage.isVolunteerLoggedIn();
        if (!isVolunteerLoggedIn) {
          setUserType('volunteer');
          setShowVolunteerLogin(true);
        } else {
          setUserType('volunteer');
        }
      } else {
        // Regular user, already registered
        setUserType('user');
      }
    } catch (error) {
      console.error('Error checking user status:', error);
      // Fallback to user type selection
      setShowUserTypeSelection(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUserTypeSelection = async (selectedType) => {
    try {
      await UserStorage.setUserType(selectedType);
      setUserType(selectedType);
      setShowUserTypeSelection(false);

      if (selectedType === 'user') {
        // Check if user is already registered
        const isRegistered = await UserStorage.isUserRegistered();
        if (!isRegistered) {
          setShowRegistration(true);
        }
      } else if (selectedType === 'volunteer') {
        // Show volunteer login
        setShowVolunteerLogin(true);
      }
    } catch (error) {
      console.error('Error saving user type:', error);
    }
  };

  const handleRegistrationComplete = () => {
    setShowRegistration(false);
  };

  const handleVolunteerLoginSuccess = async (volunteerData) => {
    try {
      await UserStorage.setVolunteerLoginData(volunteerData);
      setShowVolunteerLogin(false);
    } catch (error) {
      console.error('Error saving volunteer login data:', error);
    }
  };

  const handleVolunteerLoginClose = () => {
    setShowVolunteerLogin(false);
    setShowUserTypeSelection(true);
  };

  if (isLoading) {
    // You can add a splash screen component here
    return null;
  }

  return (
    <RegistrationContext.Provider value={{ 
      isRegistrationModalOpen: showRegistration, 
      setShowRegistration,
      userType 
    }}>
      <Navigation userType={userType} />
      <StatusBar style="light" />
      
      <UserTypeModal
        visible={showUserTypeSelection}
        onSelectUserType={handleUserTypeSelection}
      />
      
      <RegistrationModal 
        visible={showRegistration}
        onComplete={handleRegistrationComplete}
      />

      <VolunteerLoginModal
        visible={showVolunteerLogin}
        onLoginSuccess={handleVolunteerLoginSuccess}
        onClose={handleVolunteerLoginClose}
      />
    </RegistrationContext.Provider>
  );
}
