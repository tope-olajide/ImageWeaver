import MainGame from "@/components/MainGame";
import MainMenu from "@/components/MainMenu";
import TournamentView from "@/components/Tornament/TornamentView";
import { useGameContext } from "@/contexts/GameContext";
import React from "react";
export default function App() {
  const { gameState } = useGameContext();
  return (
    <>
       {gameState==="mainMenu"?<MainMenu/>:gameState === "mainGame"? <MainGame /> :gameState === "tournament"?<TournamentView />:null}
      
    </>
  );
}
