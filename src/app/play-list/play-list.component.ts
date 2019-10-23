import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HomeService } from '../home/home.service';
import { FooterService } from '../footer/footer.service';

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

  constructor(private homeSer: HomeService, private footSer: FooterService) { }

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
      this.currentSong = data;
    });
  }

  dataAdapter(data) {
    let ret = {
      'id': data.id,
      'name': '偏爱',
      'author': '张芸京',
      'preview': '/wangyiyun-online/assets/images/s1.jpg',
      'source': '每日歌曲推荐',
      'zhuanji': '一碗',
      'lyric': '',
      'url': data.url,
      'time': '02:25',
      'vip': true
    };
    return ret;
  }

}
