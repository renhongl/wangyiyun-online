import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  playing: boolean;

  constructor() { }

  ngOnInit() {
  }

  openPlaying(): void{
    this.playing = true;
  }

  closePlaying(): void{
    this.playing = false;
  }

}
