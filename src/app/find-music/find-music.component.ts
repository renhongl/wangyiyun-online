import { Component, OnInit } from '@angular/core';
import { FindMusicService } from './find-music.service';

@Component({
  selector: 'app-find-music',
  templateUrl: './find-music.component.html',
  styleUrls: ['./find-music.component.scss']
})
export class FindMusicComponent implements OnInit {

  songs: any;

  constructor(private findMusicServ: FindMusicService) { }

  ngOnInit() {
    this.getSongs();
  }

  getSongs() {
    this.findMusicServ.getSongs('all').subscribe(data => {
      this.songs = data;
    });
  }

}
