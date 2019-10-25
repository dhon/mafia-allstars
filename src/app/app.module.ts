import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { PlayerComponent } from './components/player/player.component';
import { StatsComponent } from './components/stats/stats.component';
import { StatsService } from './services/stats.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PlayerComponent,
    StatsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    StatsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
