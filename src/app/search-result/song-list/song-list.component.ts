import { Component, OnInit, Input } from '@angular/core';
import { HomeService } from 'src/app/home/home.service';

@Component({
  selector: 'app-search-song-list',
  templateUrl: './song-list.component.html',
  styleUrls: ['./song-list.component.scss']
})
export class SongListComponent implements OnInit {

  @Input() songList;
  playList: any;

  constructor(private homeSer: HomeService) { }

  ngOnInit() {
    this.homeSer.playList.subscribe(data => {
      this.playList = data;
    });
  }

  playThisSong(song) {
    song.current = true;
    const newList = Object.assign([], this.playList);
    newList.forEach(item => {
        item.current = false;
    });
    newList.push(song);
    this.homeSer.playList.next(newList);
  }

}
