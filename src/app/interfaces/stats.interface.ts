export const TOWN = 'Town';
export const MAFIA = 'Mafia';

export interface MafiaGame {
  id: string;
  mafia: string[];
  kill: string[][];
  cop: string;
  check: string[];
  medic: string;
  save: string[];
  vigilante: string;
  shot: string[];
  vanilla_town: string[];
  lynched: string[];
  f3_win: string[];
  f3_loss: string[];
  winner: string;
}

export interface PlayerStats {
  name: string;
  games: number;
  totalWinPercentage: string;
  totalWins: number;
  totalLosses: number;
  townWinPercentage: string;
  townWins: number;
  townLosses: number;
  mafiaWinPercentage: string;
  mafiaWins: number;
  mafiaLosses: number;
  n0ed: number;
  n0Saved: number;
  final3Wins: number;
  final3Losses: number;
  vigilanteShotMafia: number;
  vigilanteShotVT: number;
  vigilanteShotCop: number;
  vigilanteShotMedic: number;
  lynchedAsMafia: number;
  lynchedAsVT: number;
  lynchedAsCop: number;
  lynchedAsMedic: number;
  lynchedAsVigilante: number;
  shotAsMafia: number;
  shotAsVT: number;
  shotAsCop: number;
  shotAsMedic: number;
  cop: number;
  medic: number;
  vigilante: number;
  townPercentage: string;
  prPercentage: string;
}
