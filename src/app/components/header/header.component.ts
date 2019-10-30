import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  public routeHome(): void {
    this.router.navigate(['/']);
  }

  public routePlayers(): void {
    this.router.navigate(['players']);
  }

  public routeStats(): void {
    this.router.navigate(['stats']);
  }

  public routeStatsYear(year: '2017' | '2018' | '2019' | 'all'): void {
    this.router.navigate(['stats', year]);
  }

}
