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
  playList: any;

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.songListSer.getSongList(id).subscribe(data => {
      this.songList = this.dataAdapter(data);
    });

    this.footSer.songDetail.subscribe(data => {
      this.currentSong = data;
    });

    this.homeSer.playList.subscribe(data => {
      this.playList = data;
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
        'time': this.timeFormat(item.dt),
        'vip': true,
        picUrl: item.al.picUrl,
        playCount: item.playCount
      };
      ret.songs.push(temp);
    });
    return ret;
  }

  timeFormat(time) {
    let mins = Number.parseInt((time / 1000 / 60).toString());
    let secs = Number.parseInt((time / 1000 % 60).toString());
    return this.addZero(mins) + ':' + this.addZero(secs);
  }

  addZero(time) {
    if (time < 10) {
      return '0' + time;
    }
    return time;
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

  addThisList() {
    const newList = this.playList.concat(this.songList.songs);
    const temp = [];
    newList.forEach(item => {
      let has = false;
      temp.forEach(ite => {
        if (item.id === ite.id) {
          has = true;
        }
      });
      if (!has) {
        temp.push(item);
      }
    });
    this.homeSer.playList.next(temp);
  }

  playThisList(id) {
    const newList = Object.assign([], this.songList.songs);
    newList.forEach(item => {
      if (item.id === id) {
        item.current = true;
      } else {
        item.current = false;
      }
    });
    this.homeSer.playList.next(newList);
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
