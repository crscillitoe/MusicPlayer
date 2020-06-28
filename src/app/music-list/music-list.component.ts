import { Component, OnInit } from '@angular/core';
import { MusicList, Song } from '../services/music-list';
import { MusicPlayerService } from '../services/music-player.service';

@Component({
  selector: 'app-music-list',
  templateUrl: './music-list.component.html',
  styleUrls: ['./music-list.component.scss'],
})
export class MusicListComponent implements OnInit {
  musicList = MusicList.songs;
  currentSong: string;

  constructor(private musicService: MusicPlayerService) {
    musicService.getSongName().subscribe((songName: string) => {
      this.currentSong = songName;
    });
  }

  playSong(song: Song) {
    this.musicService.loadSong(song.path, song.displayName);
  }

  ngOnInit(): void {}
}
