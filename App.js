import Navigation from './app/navigation';
import { StatusBar } from 'expo-status-bar';
import './global.css';
import './i18n'; // Initialize i18n

export default function App() {
  return (
    <>
      <Navigation />
      <StatusBar style="auto" />
    </>
  );
}
