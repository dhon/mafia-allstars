export const TOWN = 'Town';
export const MAFIA = 'Mafia';
export const COP = 'Cop';
export const MEDIC = 'Medic';
export const VIGILANTE = 'Vigilante';
export const VT = 'VT';
export const NONE = 'NONE';

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

export interface GameStats {
  game1TownWins: number;
  game2TownWins: number;
  totalTownWins: number;
  game1MafiaWins: number;
  game2MafiaWins: number;
  totalMafiaWins: number;
  game1TownWinPercentage: number;
  game2TownWinPercentage: number;
  totalTownWinPercentage: number;
  game1DayOneTwoSleeps: number;
  game2DayOneTwoSleeps: number;
  totalDayOneTwoSleeps: number;
}

export interface PlayerStats {
  name: string;
  games: number;
  totalWins: number;
  totalLosses: number;
  totalWinPercentage: number;
  townWins: number;
  townLosses: number;
  townWinPercentage: number;
  mafiaWins: number;
  mafiaLosses: number;
  mafiaWinPercentage: number;
  n0ed: number;
  n0Saved: number;
  final3Wins: number;
  final3Losses: number;
  lynchedAsCop: number;
  lynchedAsMedic: number;
  lynchedAsVigilante: number;
  lynchedAsVT: number;
  lynchedAsMafia: number;
  shotAsCop: number;
  shotAsMedic: number;
  shotAsVT: number;
  shotAsMafia: number;
  vigilanteShotCop: number;
  vigilanteShotMedic: number;
  vigilanteShotVT: number;
  vigilanteShotMafia: number;
  rolledCop: number;
  rolledMedic: number;
  rolledVigilante: number;
  townPercentage: number;
  prPercentage: number;
}

export const PlayerStatsArray = [
  'name',
  'games',
  'totalWins',
  'totalLosses',
  'totalWinPercentage',
  'townWins',
  'townLosses',
  'townWinPercentage',
  'mafiaWins',
  'mafiaLosses',
  'mafiaWinPercentage',
  'n0ed',
  'n0Saved',
  'final3Wins',
  'final3Losses',
  'lynchedAsCop',
  'lynchedAsMedic',
  'lynchedAsVigilante',
  'lynchedAsVT',
  'lynchedAsMafia',
  'shotAsCop',
  'shotAsMedic',
  'shotAsVT',
  'shotAsMafia',
  'vigilanteShotCop',
  'vigilanteShotMedic',
  'vigilanteShotVT',
  'vigilanteShotMafia',
  'rolledCop',
  'rolledMedic',
  'rolledVigilante',
  'townPercentage',
  'prPercentage'
];
