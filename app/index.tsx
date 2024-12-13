
import { GameProvider } from "@/contexts/GameContext";
import App from "./App";
export default function Index() {
  return (
    <>
      <GameProvider>
        <App />
      </GameProvider>
      
    </>
  );
}
