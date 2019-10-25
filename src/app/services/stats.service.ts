import * as Schemas from '../interfaces/stats.interface';
import g01 from '../../assets/2019/01.json';
import g02 from '../../assets/2019/02.json';
import g03 from '../../assets/2019/03.json';
import g04 from '../../assets/2019/04.json';
import g05 from '../../assets/2019/05.json';

export class StatsService {
  public mafiaGames: Schemas.MafiaGame[] = null;
  public playerStats: Schemas.PlayerStats[] = null;
  public playerNames: string[] = null;

  constructor() {
    this.mafiaGames = [g01, g02, g03, g04, g05];
    this.playerNames = this.getPlayerNames();
    this.playerStats = [];
  }

  private getPlayerNames(): string[] {
    const names: string[] = [];
    this.mafiaGames.forEach(game => {
      names.push(game.cop);
      names.push(game.medic);
      names.push(game.vigilante);
      game.vanilla_town.forEach(vt => names.push(vt));
      game.mafia.forEach(mafia => names.push(mafia));
    });
    return Array.from(new Set(names)); // Remove duplicates
  }
}
