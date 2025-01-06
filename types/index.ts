export interface Letter {
    letter: string;
    id: string;
    isUnLocked: boolean
}

export interface Player  {
    userId: string;
    level: number;
    username: string;
    coinsPerLevel: { level: number; coins: number }[];
    name: string;
  };
  
export interface Tournament  {
    name: string;
    creatorId: string;
    players: Player[];
    numberOfPlayers: number;
    status: "running" | "ended";
    startDate: number;
    tournamentQuestIndexes: number[];
    winnerId: string;
  };