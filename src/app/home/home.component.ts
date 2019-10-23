import { Component, OnInit } from '@angular/core';
import { HomeService } from './home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  playing: boolean;
  playList: boolean;

  constructor(private homeSer: HomeService) { }

  ngOnInit() {
    this.homeSer.getPlayList('0001').subscribe(data => {
      this.homeSer.playList.next(data['songs']);
    });
  }

  openPlaying(): void {
    this.playing = true;
  }

  closePlaying(): void {
    this.playing = false;
  }

  openPlayList(): void {
    this.playList = !this.playList;
  }

  closePlayList(): void {
    this.playList = false;
  }

}
