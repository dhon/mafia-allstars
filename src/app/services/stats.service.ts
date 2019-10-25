import * as Schemas from '../interfaces/stats.interface';
import * as g01 from '../../assets/2019/01.json';
import * as g02 from '../../assets/2019/02.json';
import * as g03 from '../../assets/2019/03.json';
import * as g04 from '../../assets/2019/04.json';
import * as g05 from '../../assets/2019/05.json';

export class StatsService {
  public mafiaGames: Schemas.MafiaGame[] = null;
  public playerStats: Schemas.PlayerStats[] = null;

  constructor() {
    this.mafiaGames = [g01, g02, g03, g04, g05];
    this.playerStats = [];
  }
}
