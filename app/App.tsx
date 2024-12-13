import MainGame from "@/components/MainGame";
import MainMenu from "@/components/MainMenu";
import { useGameContext } from "@/contexts/GameContext";

export default function App() {
  const { gameState } = useGameContext();
  return (
    <>
       {gameState==="mainMenu"?<MainMenu/>:<MainGame />}
      
    </>
  );
}
