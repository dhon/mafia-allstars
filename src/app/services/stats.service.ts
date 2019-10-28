import g01 from '../../assets/2019/01.json';
import g02 from '../../assets/2019/02.json';
import g03 from '../../assets/2019/03.json';
import g04 from '../../assets/2019/04.json';
import g05 from '../../assets/2019/05.json';
import g06 from '../../assets/2019/06.json';
import g07 from '../../assets/2019/07.json';
import g08 from '../../assets/2019/08.json';
import g09 from '../../assets/2019/09.json';
import g10 from '../../assets/2019/10.json';
import g11 from '../../assets/2019/11.json';
import g12 from '../../assets/2019/12.json';
import g13 from '../../assets/2019/13.json';
import g14 from '../../assets/2019/14.json';
import g15 from '../../assets/2019/15.json';
import g16 from '../../assets/2019/16.json';
import g17 from '../../assets/2019/17.json';
import g18 from '../../assets/2019/18.json';
import g19 from '../../assets/2019/19.json';
import g20 from '../../assets/2019/20.json';
import g21 from '../../assets/2019/21.json';
import g22 from '../../assets/2019/22.json';
import g23 from '../../assets/2019/23.json';
import g24 from '../../assets/2019/24.json';
import g25 from '../../assets/2019/25.json';
import g26 from '../../assets/2019/26.json';
import g27 from '../../assets/2019/27.json';
import g28 from '../../assets/2019/28.json';
import g29 from '../../assets/2019/29.json';
import g30 from '../../assets/2019/30.json';
import g31 from '../../assets/2019/31.json';
import g32 from '../../assets/2019/32.json';
import g33 from '../../assets/2019/33.json';
import g34 from '../../assets/2019/34.json';
import g35 from '../../assets/2019/35.json';
import g36 from '../../assets/2019/36.json';
import g37 from '../../assets/2019/37.json';
import g38 from '../../assets/2019/38.json';
import g39 from '../../assets/2019/39.json';
import g40 from '../../assets/2019/40.json';
import g41 from '../../assets/2019/41.json';
import g42 from '../../assets/2019/42.json';
import g43 from '../../assets/2019/43.json';
import g44 from '../../assets/2019/44.json';
import g45 from '../../assets/2019/45.json';
import g46 from '../../assets/2019/46.json';
import g47 from '../../assets/2019/47.json';
import g48 from '../../assets/2019/48.json';
import g49 from '../../assets/2019/49.json';
import g50 from '../../assets/2019/50.json';
import g51 from '../../assets/2019/51.json';
import g52 from '../../assets/2019/52.json';
import g53 from '../../assets/2019/53.json';
import g54 from '../../assets/2019/54.json';
import g55 from '../../assets/2019/55.json';
import g56 from '../../assets/2019/56.json';
import g57 from '../../assets/2019/57.json';
import g58 from '../../assets/2019/58.json';
import g59 from '../../assets/2019/59.json';
import g60 from '../../assets/2019/60.json';
import g61 from '../../assets/2019/61.json';
import g62 from '../../assets/2019/62.json';
import g63 from '../../assets/2019/63.json';
import g64 from '../../assets/2019/64.json';
import g65 from '../../assets/2019/65.json';
import g66 from '../../assets/2019/66.json';
import g67 from '../../assets/2019/67.json';
import g68 from '../../assets/2019/68.json';
import g69 from '../../assets/2019/69.json';
import g70 from '../../assets/2019/70.json';
import g71 from '../../assets/2019/71.json';
import * as Schemas from '../interfaces/stats.interface';

export class StatsService {
  public readonly mafiaGames: Schemas.MafiaGame[];
  public readonly playerNames: string[];
  public readonly playerStats: Map<string, Schemas.PlayerStats>;

  constructor() {
    this.mafiaGames = [
      g01, g02, g03, g04, g05, g06, g07, g08, g09, g10,
      g11, g12, g13, g14, g15, g16, g17, g18, g19, g20,
      g21, g22, g23, g24, g25, g26, g27, g28, g29, g30,
      g31, g32, g33, g34, g35, g36, g37, g38, g39, g40,
      g41, g42, g43, g44, g45, g46, g47, g48, g49, g50,
      g51, g52, g53, g54, g55, g56, g57, g58, g59, g60,
      g61, g62, g63, g64, g65, g66, g67, g68, g69, g70,
      g71
    ];
    this.playerNames = this.getPlayerNames();
    this.playerStats = this.initPlayerStats();
    this.mafiaGames.forEach(game => {
      this.getGames(game);
      this.getRolled(game);
      this.getWinsLosses(game);
      this.getShots(game);
      this.getLynched(game);
      this.getN0(game);
      this.getFinal3(game);
    });
    this.getTotals();
    this.playerStats = this.sortMap(this.playerStats);
    this.validateNames();
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
    const uniqueNames = Array.from(new Set(names)); // Remove duplicates
    // Make all names lowercase and remove whitespace to test for JSON input errors
    const validateNames = uniqueNames.map(name => name.toLowerCase().replace(/\s/g, ''));
    if (uniqueNames.length !== validateNames.length) {
      console.log('Warning: At least one player has name capitalization or spacing issues.');
    }
    return uniqueNames;
  }

  private initPlayerStats(): Map<string, Schemas.PlayerStats> {
    const map = new Map<string, Schemas.PlayerStats>();
    this.playerNames.forEach(name =>
      map.set(name, {
        name,
        games: 0,
        totalWins: 0,
        totalLosses: 0,
        totalWinPercentage: null,
        townWins: 0,
        townLosses: 0,
        townWinPercentage: null,
        mafiaWins: 0,
        mafiaLosses: 0,
        mafiaWinPercentage: null,
        n0ed: 0,
        n0Saved: 0,
        final3Wins: 0,
        final3Losses: 0,
        vigilanteShotCop: 0,
        vigilanteShotMedic: 0,
        vigilanteShotVT: 0,
        vigilanteShotMafia: 0,
        lynchedAsCop: 0,
        lynchedAsMedic: 0,
        lynchedAsVigilante: 0,
        lynchedAsVT: 0,
        lynchedAsMafia: 0,
        shotAsCop: 0,
        shotAsMedic: 0,
        shotAsVT: 0,
        shotAsMafia: 0,
        rolledCop: 0,
        rolledMedic: 0,
        rolledVigilante: 0,
        townPercentage: null,
        prPercentage: null
      })
    );
    return map;
  }

  private getGames(game: Schemas.MafiaGame): void {
    this.playerStats.get(game.cop).games++;
    this.playerStats.get(game.medic).games++;
    this.playerStats.get(game.vigilante).games++;
    game.vanilla_town.forEach(player => this.playerStats.get(player).games++);
    game.mafia.forEach(player => this.playerStats.get(player).games++);
  }

  private getRolled(game: Schemas.MafiaGame): void {
    this.playerStats.get(game.cop).rolledCop++;
    this.playerStats.get(game.medic).rolledMedic++;
    this.playerStats.get(game.vigilante).rolledVigilante++;
  }

  private getWinsLosses(game: Schemas.MafiaGame): void {
    const town = [game.cop, game.medic, game.vigilante, ...game.vanilla_town];
    if (game.winner === Schemas.TOWN) {
      town.filter(player => this.survivedN0(player, game)).forEach(player => this.playerStats.get(player).townWins++);
      game.mafia.forEach(player => this.playerStats.get(player).mafiaLosses++);
    } else if (game.winner === Schemas.MAFIA) {
      town.filter(player => this.survivedN0(player, game)).forEach(player => this.playerStats.get(player).townLosses++);
      game.mafia.forEach(player => this.playerStats.get(player).mafiaWins++);
    } else {
      console.log('Warning: Winning team has invalid input.');
    }
  }

  private getShots(game: Schemas.MafiaGame): void {
    const shotPlayer = game.shot[game.shot.length - 1];
    if (shotPlayer !== Schemas.NONE) {
      const roll = this.getRoll(shotPlayer, game);
      if (roll === Schemas.COP) {
        this.playerStats.get(game.vigilante).vigilanteShotCop++;
        this.playerStats.get(shotPlayer).shotAsCop++;
      } else if (roll === Schemas.MEDIC) {
        this.playerStats.get(game.vigilante).vigilanteShotMedic++;
        this.playerStats.get(shotPlayer).shotAsMedic++;
      } else if (roll === Schemas.VIGILANTE) {
        console.log('Warning: Vigilante shot himself.');
      } else if (roll === Schemas.VT) {
        this.playerStats.get(game.vigilante).vigilanteShotVT++;
        this.playerStats.get(shotPlayer).shotAsVT++;
      } else if (roll === Schemas.MAFIA) {
        this.playerStats.get(game.vigilante).vigilanteShotMafia++;
        this.playerStats.get(shotPlayer).shotAsMafia++;
      } else {
        console.log('Warning: Shot player does not have a roll.');
      }
    }
  }

  private getLynched(game: Schemas.MafiaGame): void {
    game.lynched.filter(lynch => lynch !== Schemas.SLEEP).forEach(lynch => {
      const roll = this.getRoll(lynch, game);
      if (roll === Schemas.COP) {
        this.playerStats.get(lynch).lynchedAsCop++;
      } else if (roll === Schemas.MEDIC) {
        this.playerStats.get(lynch).lynchedAsMedic++;
      } else if (roll === Schemas.VIGILANTE) {
        this.playerStats.get(lynch).lynchedAsVigilante++;
      } else if (roll === Schemas.VT) {
        this.playerStats.get(lynch).lynchedAsVT++;
      } else if (roll === Schemas.MAFIA) {
        this.playerStats.get(lynch).lynchedAsMafia++;
      } else {
        console.log('Warning: Lynched player does not have a roll.');
      }
    });
  }

  private getN0(game: Schemas.MafiaGame): void {
    game.kill[0].forEach(player => this.playerStats.get(player).n0ed++);
    if (game.save[0] !== Schemas.NONE) {
      this.playerStats.get(game.save[0]).n0Saved++;
    }
  }

  private getFinal3(game: Schemas.MafiaGame): void {
    if (game.f3_win && game.f3_loss) {
      game.f3_win.forEach(player => this.playerStats.get(player).final3Wins++);
      game.f3_loss.forEach(player => this.playerStats.get(player).final3Losses++);
    } else if ((game.f3_win && !game.f3_loss) || (!game.f3_win && game.f3_loss)) {
      console.log('Warning: Final 3 data is missing');
    }
  }

  private getTotals(): void {
    this.playerStats.forEach(player => {
      player.totalWins = player.townWins + player.mafiaWins;
      player.totalLosses = player.townLosses + player.mafiaLosses;
      player.townWins + player.townLosses !== 0
        ? player.townWinPercentage = Math.round(((player.townWins / (player.townWins + player.townLosses)) * 100))
        : player.townWinPercentage = null;
      player.mafiaWins + player.mafiaLosses !== 0
        ? player.mafiaWinPercentage = Math.round(((player.mafiaWins / (player.mafiaWins + player.mafiaLosses)) * 100))
        : player.mafiaWinPercentage = null;
      player.totalWins + player.totalLosses !== 0
        ? player.totalWinPercentage = Math.round(((player.totalWins / (player.totalWins + player.totalLosses)) * 100))
        : player.totalWinPercentage = null;
      player.townPercentage = Math.round((((player.games - player.mafiaWins - player.mafiaLosses) / player.games) * 100));
      player.prPercentage = Math.round((((player.rolledCop + player.rolledMedic + player.rolledVigilante) / player.games) * 100));
    });
  }

  private survivedN0(name: string, game: Schemas.MafiaGame): boolean {
    if (!game.kill[0].includes(name)) {
      return true; // Not targeted
    } else if (name === game.kill[0][0] && name === game.kill[0][1]) {
      return false; // Double stacked
    } else if (name === game.save[0]) {
      return true; // Saved
    } else if (name === game.kill[0][0] || name === game.kill[0][1]) {
      return false; // Targeted and not saved
    } else {
      console.log('Warning: Night 0 kills invalid');
    }
  }

  private getRoll(name: string, game: Schemas.MafiaGame): 'Cop' | 'Medic' | 'Vigilante' | 'VT' | 'Mafia' {
    if (name === game.cop) {
      return Schemas.COP;
    } else if (name === game.medic) {
      return Schemas.MEDIC;
    } else if (name === game.vigilante) {
      return Schemas.VIGILANTE;
    } else if (game.vanilla_town.includes(name)) {
      return Schemas.VT;
    } else if (game.mafia.includes(name)) {
      return Schemas.MAFIA;
    } else {
      console.log('Warning: Player does not have a roll.');
    }
  }

  private sortMap(playerStats: Map<string, Schemas.PlayerStats>): Map<string, Schemas.PlayerStats> {
    const array = Array.from(playerStats.values());
    array.sort((a, b) => {
      if (a.games > b.games) {
        return -1;
      } else if (a.games < b.games) {
        return 1;
      } else if (a.name < b.name) {
        return -1;
      } else if (a.name > b.name) {
        return 1;
      }
      return 0;
    });
    return new Map(array.map(obj => [obj.name, obj]));
  }

  private validateNames(): void {
    for (let i = 0; i < this.mafiaGames.length; i++) {
      const names: string[] = [];
      names.push(this.mafiaGames[i].cop);
      names.push(this.mafiaGames[i].medic);
      names.push(this.mafiaGames[i].vigilante);
      this.mafiaGames[i].vanilla_town.forEach(vt => names.push(vt));
      this.mafiaGames[i].mafia.forEach(mafia => names.push(mafia));
      const uniqueNames = Array.from(new Set(names)); // Remove duplicates
      if (names.length !== uniqueNames.length) {
        console.log(`Warning: Name duplication error. Game ${i = 1}`);
      }

      for (let x = 0; x < this.mafiaGames[i].check.length; x++) {
        if (!names.includes(this.mafiaGames[i].check[x])) {
          console.log(`Warning: Name error. Game ${i + 1} Check ${x}`);
        }
      }
      for (let x = 0; x < this.mafiaGames[i].save.length; x++) {
        if (!names.includes(this.mafiaGames[i].save[x]) && this.mafiaGames[i].save[x] !== Schemas.NONE) {
          console.log(`Warning: Name error. Game ${i + 1} Save ${x}`);
        }
      }
      for (let x = 0; x < this.mafiaGames[i].shot.length; x++) {
        if (!names.includes(this.mafiaGames[i].shot[x]) && this.mafiaGames[i].shot[x] !== Schemas.NONE) {
          console.log(`Warning: Name error. Game ${i + 1} Shot ${x}`);
        }
      }
      for (let x = 0; x < this.mafiaGames[i].kill.length; x++) {
        for (let y = 0; y < this.mafiaGames[i].kill[x].length; y++) {
          if (!names.includes(this.mafiaGames[i].kill[x][y])) {
            console.log(`Warning: Name error. Game ${i + 1} Kill ${x}${y}`);
          }
        }
      }
      for (let x = 0; x < this.mafiaGames[i].f3_win.length; x++) {
        if (!names.includes(this.mafiaGames[i].f3_win[x])) {
          console.log(`Warning: Name error. Game ${i + 1} Final 3 Winner ${x}`);
        }
      }
      for (let x = 0; x < this.mafiaGames[i].f3_loss.length; x++) {
        if (!names.includes(this.mafiaGames[i].f3_loss[x])) {
          console.log(`Warning: Name error. Game ${i + 1} Final 3 Loser ${x}`);
        }
      }
    }
  }
}
