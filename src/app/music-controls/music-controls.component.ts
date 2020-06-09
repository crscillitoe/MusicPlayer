import { Component, OnInit } from '@angular/core';
import { MusicPlayerService } from '../services/music-player.service';

@Component({
  selector: 'app-music-controls',
  templateUrl: './music-controls.component.html',
  styleUrls: ['./music-controls.component.scss'],
})
export class MusicControlsComponent implements OnInit {
  playing: boolean = false;
  songName: string = '';
  constructor(private musicService: MusicPlayerService) {}

  ngOnInit(): void {
    this.musicService.getPlaying().subscribe((playing: boolean) => {
      this.playing = playing;
    });

    this.musicService.getSongName().subscribe((name: string) => {
      this.songName = name;
    });
  }

  toggleMusic() {
    this.musicService.toggleMusic();
  }
}
