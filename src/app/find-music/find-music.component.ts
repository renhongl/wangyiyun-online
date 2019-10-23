import { Component, OnInit } from '@angular/core';
import { FindMusicService } from './find-music.service';

@Component({
  selector: 'app-find-music',
  templateUrl: './find-music.component.html',
  styleUrls: ['./find-music.component.scss']
})
export class FindMusicComponent implements OnInit {

  songs: any;
  recommendSongs: any;

  constructor(private findMusicServ: FindMusicService) { }

  ngOnInit() {
    this.getSongType();
    this.getRecommendType();
  }

  getSongType() {
    this.findMusicServ.getSongType('0001').subscribe(data => {
      this.songs = data;
    });
  }

  getRecommendType() {
    this.findMusicServ.getSongTypeRecommend('0002').subscribe(data => {
      this.recommendSongs = data;
    });
  }

}
