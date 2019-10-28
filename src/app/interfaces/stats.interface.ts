export const TOWN = 'Town';
export const MAFIA = 'Mafia';
export const COP = 'Cop';
export const MEDIC = 'Medic';
export const VIGILANTE = 'Vigilante';
export const VT = 'VT';
export const NONE = 'NONE';
export const SLEEP = 'SLEEP';

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
  vigilanteShotCop: number;
  vigilanteShotMedic: number;
  vigilanteShotVT: number;
  vigilanteShotMafia: number;
  lynchedAsCop: number;
  lynchedAsMedic: number;
  lynchedAsVigilante: number;
  lynchedAsVT: number;
  lynchedAsMafia: number;
  shotAsCop: number;
  shotAsMedic: number;
  shotAsVT: number;
  shotAsMafia: number;
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
  'vigilanteShotCop',
  'vigilanteShotMedic',
  'vigilanteShotVT',
  'vigilanteShotMafia',
  'lynchedAsCop',
  'lynchedAsMedic',
  'lynchedAsVigilante',
  'lynchedAsVT',
  'lynchedAsMafia',
  'shotAsCop',
  'shotAsMedic',
  'shotAsVT',
  'shotAsMafia',
  'rolledCop',
  'rolledMedic',
  'rolledVigilante',
  'townPercentage',
  'prPercentage'
];
