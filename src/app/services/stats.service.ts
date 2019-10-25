import * as Schemas from '../interfaces/stats.interface';
import g01 from '../../assets/2019/01.json';
import g02 from '../../assets/2019/02.json';
import g03 from '../../assets/2019/03.json';
import g04 from '../../assets/2019/04.json';
import g05 from '../../assets/2019/05.json';

export class StatsService {
  public readonly mafiaGames: Schemas.MafiaGame[] = null;
  public readonly playerNames: string[] = null;
  public playerStats: Schemas.PlayerStats[] = null;

  constructor() {
    this.mafiaGames = [g01, g02, g03, g04, g05];
    this.playerNames = this.getPlayerNames();
    this.playerStats = this.initPlayerStats();
  }

  // Return an array of all player names
  private getPlayerNames(): string[] {
    const names: string[] = [];
    this.mafiaGames.forEach(game => {
      names.push(game.cop);
      names.push(game.medic);
      names.push(game.vigilante);
      game.vanilla_town.forEach(vt => names.push(vt));
      game.mafia.forEach(mafia => names.push(mafia));
    });
    const uniqueNames = Array.from(new Set(names)); // Remove duplicates
    // Make all names lowercase and remove whitespace to test for JSON input errors
    const validateNames = uniqueNames.map(name => name.toLowerCase().replace(/\s/g, ''));
    if (uniqueNames.length !== validateNames.length) {
      console.log('Warning: At least one player has name issues.');
    }
    return uniqueNames;
  }

  // Return the initialized array of all player stats
  private initPlayerStats(): Schemas.PlayerStats[] {
    return this.playerNames.map(name => {
      return {
        name,
        games: 0,
        totalWinPercentage: null,
        totalWins: 0,
        totalLosses: 0,
        townWinPercentage: null,
        townWins: 0,
        townLosses: 0,
        mafiaWinPercentage: null,
        mafiaWins: 0,
        mafiaLosses: 0,
        averageDaysLived: null,
        n0ed: 0,
        n0Saved: 0,
        final3Wins: 0,
        final3Losses: 0,
        vigilanteShotMafia: 0,
        vigilanteShotVT: 0,
        vigilanteShotPR: 0,
        lynchedAsMafia: 0,
        lynchedAsVT: 0,
        lynchedAsPR: 0,
        shotAsMafia: 0,
        shotAsVT: 0,
        shotAsPR: 0,
        cop: 0,
        medic: 0,
        vigilante: 0,
        townPercentage: null,
        prPercentage: null
      };
    });
  }
}
