import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HomeService } from '../home/home.service';
import { FooterService } from '../footer/footer.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-play-list',
  templateUrl: './play-list.component.html',
  styleUrls: ['./play-list.component.scss']
})
export class PlayListComponent implements OnInit {

  @Output()
  close = new EventEmitter();

  showList = true;
  playList: any;
  currentSong: any;
  preventSimpleClick: boolean;
  timer: any;

  constructor(private homeSer: HomeService, private footSer: FooterService, private message: NzMessageService) { }

  ngOnInit() {
    this.homeSer.playList.subscribe(data => {
      this.playList = data;
    });

    this.footSer.songDetail.subscribe(data => {
      this.currentSong = data;
    });
  }

  closePlayList() {
    this.close.emit('close');
  }

  showListPage() {
    this.showList = true;
  }

  showHistory() {
    this.showList = false;
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

  doubleClick(item): void {
    this.preventSimpleClick = true;
    clearTimeout(this.timer);
    this.playThisMusic(item);
  }

  playThisMusic(item) {
    this.footSer.getSongDetail(item.id).subscribe(data => {
      this.footSer.songDetail.next(this.dataAdapter(data['data'][0]));
      this.currentSong = this.getCurrentSong(data['data'][0]);
      this.message.success(`正在播放：${this.currentSong.name}`);
    });
  }

  getCurrentSong(data) {
    let ret;
    this.playList.forEach(item => {
      if (item.id === data.id) {
        ret = item;
      }
    });
    return ret;
  }

  setCurrent(id) {
    let newList = Object.assign([], this.playList);
    newList.forEach(item => {
      if (item.id === id) {
        item.current = true;
      } else {
        item.current = false;
      }
    });
    this.homeSer.playList.next(newList);
  }

  dataAdapter(data) {
    let current = this.playList.filter(item => item.id === data.id)[0];
    let ret = {
      'id': data.id,
      'name': current.name,
      'author': current.author,
      'preview': current.picUrl,
      'source': '每日歌曲推荐',
      'zhuanji': current.zhuanji,
      'lyric': '',
      'url': data.url,
      'time': current.time,
      'vip': current.vip
    };
    return ret;
  }

}
