import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  playing: boolean;
  playList: boolean;

  constructor() { }

  ngOnInit() {
  }

  openPlaying(): void{
    this.playing = true;
  }

  closePlaying(): void{
    this.playing = false;
  }

  openPlayList(): void{
    this.playList = true;
  }

  closePlayList(): void{
    this.playList = false;
  }

}
