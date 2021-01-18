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
  timeLeftMinutes: number = -1;
  countingDown: boolean = false;
  startedCountDate: number;

  private _playing: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  private _songName: BehaviorSubject<string> = new BehaviorSubject<string>('');

  private _timeLeftMinutes: BehaviorSubject<number> = new BehaviorSubject<number>(
    this.timeLeftMinutes
  );

  constructor() {
    let volume = localStorage.getItem('volume');
    if (volume) {
      this.volume = parseFloat(volume);
    } else {
      this.volume = 1;
    }

    setInterval(this.count.bind(this), 1000);
  }

  count() {
    if (this.timeLeftMinutes === 0) {
      this.pause();
      this.countingDown = false;
      this.timeLeftMinutes = -1;
      this._timeLeftMinutes.next(this.timeLeftMinutes);
    }

    if (!this.countingDown) {
      this.startedCountDate = Date.now();
    } else {
      const currDate = Date.now();
      const diffMillis = currDate - this.startedCountDate;

      const minutes = Math.floor(((diffMillis % 86400000) % 3600000) / 60000);
      if (minutes >= 1) {
        this.startedCountDate = Date.now();
        this.timeLeftMinutes--;
        this._timeLeftMinutes.next(this.timeLeftMinutes);
      }
    }
  }

  /**
   * Loads the given song into the player
   * Plays the song
   *
   * @param path Path to the song to load
   */
  loadSong(path: string, name: string): void {
    this.pause();
    this.currentSong = new Howl({
      src: [path],
      autoplay: true,
      loop: true,
      volume: this.volume > 1 ? 1 : this.volume,
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

    this.volume = percent / 100;
    localStorage.setItem('volume', `${percent / 100}`);
    this.currentSong.volume(percent / 100);
  }

  /**
   * Extends the playback duration by the given
   * number of minutes.
   *
   * @param numMinutes Number of minutes to add
   */
  addMinutes(numMinutes: number) {
    this.countingDown = true;
    let toAdd: number = numMinutes;
    if (this.timeLeftMinutes === -1) {
      toAdd++;
    }

    this.timeLeftMinutes += toAdd;
    this._timeLeftMinutes.next(this.timeLeftMinutes);
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

  /**
   * Returns the observable tracking the number of minutes left
   * of playback.
   */
  getTimeLeft(): BehaviorSubject<number> {
    return this._timeLeftMinutes;
  }
}
