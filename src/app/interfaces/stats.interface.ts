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
  totalWinPercent: number;
  totalWins: number;
  totalLosses: number;
  townWinPercent: number;
  townWins: number;
  townLosses: number;
  mafiaWinPercent: number;
  mafiaWins: number;
  mafiaLosses: number;
  averageDaysLived: number;
  n0ed: number;
  n0Saved: number;
  final3Wins: number;
  final3Losses: number;
  vigilanteShotMafia: number;
  vigilanteShotVT: number;
  vigilanteShotPR: number;
  mafiaLynched: number;
  vtLynched: number;
  prLynched: number;
  mafiaShot: number;
  vtShot: number;
  prShot: number;
  cop: number;
  medic: number;
  vigilante: number;
  townPercent: number;
  prPercent: number;
}
