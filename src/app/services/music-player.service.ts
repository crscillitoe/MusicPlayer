import { Injectable } from '@angular/core';
import { Howl } from 'howler';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MusicPlayerService {
  currentSong: Howl = null;
  songName: string = '';
  volume: number;

  private _playing: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  private _songName: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor() {
    let volume = localStorage.getItem('volume');
    if (volume) {
      this.volume = parseInt(volume);
    } else {
      this.volume = 100;
    }
  }

  /**
   * Loads the given song into the player
   * Plays the song
   *
   * @param path Path to the song to load
   */
  loadSong(path: string, name: string): void {
    this.currentSong = new Howl({
      src: [path],
      autoplay: true,
      loop: true,
      volume: this.volume,
    });

    this._songName.next(name);
    this._playing.next(true);
  }

  /**
   * Toggles the music on and off
   */
  toggleMusic(): void {
    if (this.currentSong) {
      if (this.currentSong.playing()) {
        this.pause();
      } else {
        this.play();
      }
    }
  }

  /**
   * Plays the song
   */
  play(): void {
    if (this.currentSong) {
      this.currentSong.play();
      this._playing.next(true);
    }
  }

  /**
   * Pauses the song
   */
  pause(): void {
    if (this.currentSong) {
      this.currentSong.pause();
      this._playing.next(false);
    }
  }

  /**
   * Sets the volume to the given %, value must be between 0 and 100
   *
   * @param percent
   */
  setVolume(percent: number) {
    // Bounds check
    if (percent < 0 || percent > 100) {
      return;
    }

    this.volume = percent;
    localStorage.setItem('volume', `${percent}`);
    this.currentSong.volume(percent);
  }

  /**
   * Returns the observable tracking whether or not a song is playing
   */
  getPlaying(): BehaviorSubject<boolean> {
    return this._playing;
  }

  /**
   * Returns the observable tracking the name of the currently
   * selected song.
   */
  getSongName(): BehaviorSubject<string> {
    return this._songName;
  }
}
