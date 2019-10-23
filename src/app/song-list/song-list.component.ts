import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SongListService } from './song-list.service';
import { HomeService } from '../home/home.service';
import { FooterService } from '../footer/footer.service';

@Component({
  selector: 'app-song-list',
  templateUrl: './song-list.component.html',
  styleUrls: ['./song-list.component.scss']
})
export class SongListComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private songListSer: SongListService,
    private homeSer: HomeService,
    private footSer: FooterService) { }

  songList: any;
  preventSimpleClick: boolean;
  timer: any;
  currentSong: any;

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.songListSer.getSongList(id).subscribe(data => {
      this.songList = data;
    });

    this.footSer.songDetail.subscribe(data => {
      this.currentSong = data;
    });
  }

  singleClick(item): void {
    this.timer = 0;
    this.preventSimpleClick = false;
    let delay = 500;

    this.timer = setTimeout(() => {
      if (!this.preventSimpleClick) {
      }
    }, delay);
  }

  doubleClick(id): void {
    this.preventSimpleClick = true;
    clearTimeout(this.timer);
    this.playThisList(id);
  }

  playThisList(id) {
    let newList = Object.assign([], this.songList.songs);
    newList.forEach(item => {
      if (item.id === id) {
        item.current = true;
      } else {
        item.current = false;
      }
    });
    this.homeSer.playList.next(newList);
  }

}
