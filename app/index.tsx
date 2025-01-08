
import React from 'react';
import { GameProvider } from "@/contexts/GameContext";
import App from "./App";
import { PublicClientApplication } from '@azure/msal-browser';
import { MsalProvider } from '@azure/msal-react';
import { msalConfig } from './authConfig';
import { ToastProvider } from 'react-native-toast-notifications';
import { SoundProvider } from '@/contexts/SoundContext';
const msalInstance = new PublicClientApplication(msalConfig);

export default function Index() {
  return (
    <>
      <MsalProvider instance={msalInstance}>
        <GameProvider>
        <ToastProvider
          placement="bottom"
          offset={0}
          >
            <SoundProvider>
              <App />
            </SoundProvider>
            
        </ToastProvider>
      </GameProvider></MsalProvider>
    </>
  );
}
