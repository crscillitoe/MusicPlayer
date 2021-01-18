import { Component, OnInit } from '@angular/core';
import { MusicPlayerService } from '../services/music-player.service';

@Component({
  selector: 'app-music-controls',
  templateUrl: './music-controls.component.html',
  styleUrls: ['./music-controls.component.scss'],
})
export class MusicControlsComponent implements OnInit {
  volume: number = 0;
  playing: boolean = false;
  songName: string = '';
  timeLeftMinutes: number;
  constructor(private musicService: MusicPlayerService) {}

  ngOnInit(): void {
    this.volume = this.musicService.volume * 100;
    this.musicService.getPlaying().subscribe((playing: boolean) => {
      this.playing = playing;
    });

    this.musicService.getSongName().subscribe((name: string) => {
      this.songName = name;
    });

    this.musicService.getTimeLeft().subscribe((timeLeft: number) => {
      this.timeLeftMinutes = timeLeft;
    });
  }

  /**
   * Adds 15 minutes to the countdown until music will stop.
   */
  add15() {
    this.musicService.addMinutes(15);
  }

  getBadge() {
    if (this.timeLeftMinutes === -1) {
      return '';
    }

    return `${this.timeLeftMinutes}`;
  }

  updateVolume() {
    this.musicService.setVolume(this.volume);
  }

  toggleMusic() {
    this.musicService.toggleMusic();
  }
}
