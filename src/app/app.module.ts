import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MusicControlsComponent } from './music-controls/music-controls.component';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule, MatIcon } from '@angular/material/icon';
import { MusicListComponent } from './music-list/music-list.component';
import { MatSliderModule } from '@angular/material/slider';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppComponent, MusicControlsComponent, MusicListComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MatToolbarModule,
    MatButtonModule,
    MatSliderModule,
    MatIconModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
