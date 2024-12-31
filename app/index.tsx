
import React from 'react';
import { GameProvider } from "@/contexts/GameContext";
import App from "./App";
import { PublicClientApplication } from '@azure/msal-browser';
import { MsalProvider } from '@azure/msal-react';
import { msalConfig } from './authConfig';
const msalInstance = new PublicClientApplication(msalConfig);

export default function Index() {
  return (
    <>
      <MsalProvider instance={msalInstance}>
      <GameProvider>
        <App />
      </GameProvider></MsalProvider>
    </>
  );
}
