import { Component, OnInit } from '@angular/core';
import { HomeService } from './home.service';
import NoSleep from 'nosleep.js';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  playing: boolean;
  playList: boolean;
  beforeClose: boolean;

  constructor(private homeSer: HomeService) { }

  ngOnInit() {
    this.homeSer.getPlayList('0001').subscribe(data => {
      this.homeSer.playList.next(data['songs']);
    });

    const noSleep = new NoSleep();
    document.addEventListener('click', function enableNoSleep() {
      document.removeEventListener('click', enableNoSleep, false);
      noSleep.enable();
    }, false);
  }

  openPlaying(): void {
    this.playing = true;
  }

  closePlaying(): void {
    this.beforeClose = true;
    setTimeout(() => {
      this.playing = false;
      this.beforeClose = false;
    }, 1000);
  }

  openPlayList(): void {
    this.playList = !this.playList;
  }

  closePlayList(): void {
    this.playList = false;
  }

}
