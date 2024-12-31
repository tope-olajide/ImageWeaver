import { createContext, FC, ReactNode, useContext, useState } from "react";

type GameState = 'mainMenu' | 'mainGame' | 'tournament';

interface GameContextProps {
    gameState: GameState;
    switchGameState: (state: GameState) => void;
}

interface GameProviderProps {
    children: ReactNode;
}

const GameContext = createContext<GameContextProps | undefined>(undefined);

export const GameProvider: FC<GameProviderProps> = ({ children }) => {
    const [gameState, setGameState] = useState<GameState>('mainMenu');

    const switchGameState = (state: GameState) => {
        setGameState(state);
    };

    return (
        <GameContext.Provider value={{ gameState, switchGameState }}>
            {children}
        </GameContext.Provider>
    );
};

export const useGameContext = (): GameContextProps => {
    const context = useContext(GameContext);
    if (!context) {
        throw new Error('useGameContext must be used within a GameProvider');
    }
    return context;
};
