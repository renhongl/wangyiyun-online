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
    this.songListSer.getSongList('2958537532').subscribe(data => {
      this.songList = this.dataAdapter(data);
    });

    this.footSer.songDetail.subscribe(data => {
      this.currentSong = data;
    });
  }

  dataAdapter(data) {
    let playListData = data.playlist;
    let ret = {
      'img': playListData.coverImgUrl,
      'category': playListData.name,
      'number': playListData.trackCount,
      'playNumber': playListData.playCount,
      'author': playListData.creator.nickname,
      'createDate': playListData.trackUpdateTime,
      'label': playListData.tags,
      'desc': playListData.description,
      'songs': []
    };
    playListData.tracks.forEach(item => {
      let temp = {
        'id': item.id,
        'name': item.name,
        'author': item.ar[0].name,
        'zhuanji': item.al.name,
        'time': item.m.size,
        'vip': true,
        playCount: item.playCount
      };
      ret.songs.push(temp);
    });
    return ret;
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
