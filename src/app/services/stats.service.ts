import { stats2019 } from './stats-2019';
import * as Schemas from '../interfaces/stats.interface';

export class StatsService {

  constructor() {}

  public getPlayerStats(year: '2017' | '2018' | '2019'): Map<string, Schemas.PlayerStats> {
    const mafiaGames = stats2019;
    const playerNames = this.initPlayerNames(mafiaGames);
    const playerStats = this.initPlayerStats(playerNames);
    mafiaGames.forEach(game => {
      this.getGames(playerStats, game);
      this.getRolled(playerStats, game);
      this.getWinsLosses(playerStats, game);
      this.getN0(playerStats, game);
      this.getLynched(playerStats, game);
      this.getShots(playerStats, game);
      this.getFinal3(playerStats, game);
    });
    this.getTotals(playerStats);
    this.validateNames(mafiaGames);
    return this.sortMap(playerStats);
  }

  private initPlayerNames(mafiaGames: Schemas.MafiaGame[]): string[] {
    const names: string[] = [];
    mafiaGames.forEach(game => {
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

  private initPlayerStats(playerNames: string[]): Map<string, Schemas.PlayerStats> {
    const map = new Map<string, Schemas.PlayerStats>();
    playerNames.forEach(name =>
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
        lynchedAsCop: 0,
        lynchedAsMedic: 0,
        lynchedAsVigilante: 0,
        lynchedAsVT: 0,
        lynchedAsMafia: 0,
        shotAsCop: 0,
        shotAsMedic: 0,
        shotAsVT: 0,
        shotAsMafia: 0,
        vigilanteShotCop: 0,
        vigilanteShotMedic: 0,
        vigilanteShotVT: 0,
        vigilanteShotMafia: 0,
        rolledCop: 0,
        rolledMedic: 0,
        rolledVigilante: 0,
        townPercentage: null,
        prPercentage: null
      })
    );
    return map;
  }

  private getGames(playerStats: Map<string, Schemas.PlayerStats>, game: Schemas.MafiaGame): void {
    playerStats.get(game.cop).games++;
    playerStats.get(game.medic).games++;
    playerStats.get(game.vigilante).games++;
    game.vanilla_town.forEach(player => playerStats.get(player).games++);
    game.mafia.forEach(player => playerStats.get(player).games++);
  }

  private getRolled(playerStats: Map<string, Schemas.PlayerStats>, game: Schemas.MafiaGame): void {
    playerStats.get(game.cop).rolledCop++;
    playerStats.get(game.medic).rolledMedic++;
    playerStats.get(game.vigilante).rolledVigilante++;
  }

  private getWinsLosses(playerStats: Map<string, Schemas.PlayerStats>, game: Schemas.MafiaGame): void {
    const town = [game.cop, game.medic, game.vigilante, ...game.vanilla_town];
    if (game.winner === Schemas.TOWN) {
      town.filter(player => this.survivedN0(player, game)).forEach(player => playerStats.get(player).townWins++);
      game.mafia.forEach(player => playerStats.get(player).mafiaLosses++);
    } else if (game.winner === Schemas.MAFIA) {
      town.filter(player => this.survivedN0(player, game)).forEach(player => playerStats.get(player).townLosses++);
      game.mafia.forEach(player => playerStats.get(player).mafiaWins++);
    } else {
      console.log('Warning: Winning team has invalid input.');
    }
  }

  private getN0(playerStats: Map<string, Schemas.PlayerStats>, game: Schemas.MafiaGame): void {
    game.kill[0].forEach(player => playerStats.get(player).n0ed++);
    if (game.save[0] !== Schemas.NONE) {
      playerStats.get(game.save[0]).n0Saved++;
    }
  }

  private getLynched(playerStats: Map<string, Schemas.PlayerStats>, game: Schemas.MafiaGame): void {
    game.lynched.filter(lynch => lynch !== Schemas.SLEEP).forEach(lynch => {
      const roll = this.getRoll(lynch, game);
      if (roll === Schemas.COP) {
        playerStats.get(lynch).lynchedAsCop++;
      } else if (roll === Schemas.MEDIC) {
        playerStats.get(lynch).lynchedAsMedic++;
      } else if (roll === Schemas.VIGILANTE) {
        playerStats.get(lynch).lynchedAsVigilante++;
      } else if (roll === Schemas.VT) {
        playerStats.get(lynch).lynchedAsVT++;
      } else if (roll === Schemas.MAFIA) {
        playerStats.get(lynch).lynchedAsMafia++;
      } else {
        console.log('Warning: Lynched player does not have a roll.');
      }
    });
  }

  private getShots(playerStats: Map<string, Schemas.PlayerStats>, game: Schemas.MafiaGame): void {
    const shotPlayer = game.shot[game.shot.length - 1];
    if (shotPlayer !== Schemas.NONE) {
      const roll = this.getRoll(shotPlayer, game);
      if (roll === Schemas.COP) {
        playerStats.get(game.vigilante).vigilanteShotCop++;
        playerStats.get(shotPlayer).shotAsCop++;
      } else if (roll === Schemas.MEDIC) {
        playerStats.get(game.vigilante).vigilanteShotMedic++;
        playerStats.get(shotPlayer).shotAsMedic++;
      } else if (roll === Schemas.VIGILANTE) {
        console.log('Warning: Vigilante shot himself.');
      } else if (roll === Schemas.VT) {
        playerStats.get(game.vigilante).vigilanteShotVT++;
        playerStats.get(shotPlayer).shotAsVT++;
      } else if (roll === Schemas.MAFIA) {
        playerStats.get(game.vigilante).vigilanteShotMafia++;
        playerStats.get(shotPlayer).shotAsMafia++;
      } else {
        console.log('Warning: Shot player does not have a roll.');
      }
    }
  }

  private getFinal3(playerStats: Map<string, Schemas.PlayerStats>, game: Schemas.MafiaGame): void {
    if (game.f3_win && game.f3_loss) {
      game.f3_win.forEach(player => playerStats.get(player).final3Wins++);
      game.f3_loss.forEach(player => playerStats.get(player).final3Losses++);
    } else if ((game.f3_win && !game.f3_loss) || (!game.f3_win && game.f3_loss)) {
      console.log('Warning: Final 3 data is missing');
    }
  }

  private getTotals(playerStats: Map<string, Schemas.PlayerStats>): void {
    playerStats.forEach(player => {
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

  private validateNames(mafiaGames: Schemas.MafiaGame[]): void {
    for (let i = 0; i < mafiaGames.length; i++) {
      const names: string[] = [];
      names.push(mafiaGames[i].cop);
      names.push(mafiaGames[i].medic);
      names.push(mafiaGames[i].vigilante);
      mafiaGames[i].vanilla_town.forEach(vt => names.push(vt));
      mafiaGames[i].mafia.forEach(mafia => names.push(mafia));
      const uniqueNames = Array.from(new Set(names)); // Remove duplicates
      if (names.length !== uniqueNames.length) {
        console.log(`Warning: Name duplication error. Game ${i + 1}`);
      }

      for (let x = 0; x < mafiaGames[i].check.length; x++) {
        if (!names.includes(mafiaGames[i].check[x])) {
          console.log(`Warning: Name error. Game ${i + 1} Check ${x}`);
        }
      }
      for (let x = 0; x < mafiaGames[i].save.length; x++) {
        if (!names.includes(mafiaGames[i].save[x]) && mafiaGames[i].save[x] !== Schemas.NONE) {
          console.log(`Warning: Name error. Game ${i + 1} Save ${x}`);
        }
      }
      for (let x = 0; x < mafiaGames[i].shot.length; x++) {
        if (!names.includes(mafiaGames[i].shot[x]) && mafiaGames[i].shot[x] !== Schemas.NONE) {
          console.log(`Warning: Name error. Game ${i + 1} Shot ${x}`);
        }
      }
      for (let x = 0; x < mafiaGames[i].kill.length; x++) {
        for (let y = 0; y < mafiaGames[i].kill[x].length; y++) {
          if (!names.includes(mafiaGames[i].kill[x][y])) {
            console.log(`Warning: Name error. Game ${i + 1} Kill ${x}${y}`);
          }
        }
      }
      for (let x = 0; x < mafiaGames[i].f3_win.length; x++) {
        if (!names.includes(mafiaGames[i].f3_win[x])) {
          console.log(`Warning: Name error. Game ${i + 1} Final 3 Winner ${x}`);
        }
      }
      for (let x = 0; x < mafiaGames[i].f3_loss.length; x++) {
        if (!names.includes(mafiaGames[i].f3_loss[x])) {
          console.log(`Warning: Name error. Game ${i + 1} Final 3 Loser ${x}`);
        }
      }
    }
  }
}
