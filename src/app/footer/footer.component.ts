import { Component, OnInit, ViewChild, OnDestroy, Output, EventEmitter } from '@angular/core';
import { FooterService } from './footer.service';
import { interval } from 'rxjs';
import { HomeService } from '../home/home.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit, OnDestroy {

  songDetail: any;
  @ViewChild('playerRef') playerRef;
  player: any;
  playing: boolean;
  checkTimer: any;
  currentTime: string;
  duration: string;
  loopStatus = 0;
  sliderMax: number;
  sliderMin: number;
  sliderValue: number;
  volume: number;
  playingIndex = 0;
  playList: any;

  @Output()
  open = new EventEmitter();

  constructor(private footerSer: FooterService, private homeSer: HomeService) { }

  ngOnInit() {
    this.listenPlayList();
    this.listSongDetail();
    this.player = this.playerRef.nativeElement;
    this.volume = 5;
    this.checkStatus();
    this.listenEnded();
  }

  listenEnded() {
    this.player.onended = () => {
      if (this.loopStatus === 0) {// list loop
        this.playingIndex++;
        if (this.playingIndex >= this.playList.length) {
          this.playingIndex = 0;
        }
        this.playThisMusic(this.playList[this.playingIndex]);
      } else if (this.loopStatus === 1) { // single loop
        this.player.play();
      } else if (this.loopStatus === 2) { // random loop
        let n = Number.parseInt((Math.random() * this.playList.length).toString());
        if (n === this.playingIndex) {
          this.player.play();
        } else {
          this.playingIndex = n;
          this.playThisMusic(this.playList[this.playingIndex]);
        }
      }
    };
  }

  before() {
    this.playingIndex--;
    if (this.playingIndex < 0) {
      this.playingIndex = this.playList.length - 1;
    }
    this.playThisMusic(this.playList[this.playingIndex]);
  }

  after() {
    this.playingIndex++;
    if (this.playingIndex >= this.playList.length) {
      this.playingIndex = 0;
    }
    this.playThisMusic(this.playList[this.playingIndex]);
  }

  updateLoopStatus() {
    if (this.loopStatus === 0) {
      this.loopStatus = 1;
    } else if (this.loopStatus === 1) {
      this.loopStatus = 2;
    } else {
      this.loopStatus = 0;
    }
  }

  playThisMusic(item) {
    this.footerSer.getSongDetail(item.id).subscribe(data => {
      this.footerSer.songDetail.next(this.dataAdapter(data['data'][0]));
    });
  }

  dataAdapter(data) {
    let current = this.playList.filter(item => item.id === data.id)[0];
    let ret = {
      'id': data.id,
      'name': current.name,
      'author': current.author,
      'preview': current.picUrl || current.preview,
      'source': '每日歌曲推荐',
      'zhuanji': current.zhuanji,
      'lyric': '',
      'url': data.url,
      'time': current.time,
      'vip': current.vip
    };
    return ret;
  }

  listSongDetail() {
    this.footerSer.songDetail.subscribe(data => {
      if (this.songDetail && this.songDetail.id === data['id']) {
        return;
      }
      this.songDetail = data;
      if (this.player && this.playing !== undefined) {
        this.player.oncanplay = () => {
          this.player.play();
          this.playing = true;
        };
      }
    });
  }

  listenPlayList() {
    this.homeSer.playList.subscribe(data => {
      if (data.length === 0) {
        return;
      }
      this.playList = data;
      let id = this.getCurrentId(data);
      this.footerSer.getSongDetail(id).subscribe(detail => {
        this.footerSer.songDetail.next(this.dataAdapter(detail['data'][0]));
        this.playing = false;
      });
    });
  }

  getCurrentId(data) {
    let ret = data[0].id;
    data.forEach((item, index) => {
      if (item.current === true) {
        ret = item.id;
        this.playingIndex = index;
      }
    });
    return ret;
  }

  openPlayList() {
    this.open.emit('open');
  }

  ngOnDestroy() {
    this.checkTimer.unsubscribe();
  }

  checkStatus() {
    this.checkTimer = interval(1000);
    this.checkTimer.subscribe(val => {
      this.updateDurationSlider();
      if (this.player.ended && this.playing) {
        this.playing = false;
      }
    });
  }

  updateDurationSlider() {
    this.currentTime = this.setMinuts(this.player.currentTime);
    this.duration = this.setMinuts(this.player.duration);
    this.sliderMax = this.player.duration;
    this.sliderMin = 0;
    this.sliderValue = this.player.currentTime;
  }

  setVolume(val) {
    this.player.volume = val.value / 10;
  }

  setCurrentTime(val) {
    this.player.currentTime = val.value;
    this.updateDurationSlider();
  }

  setMinuts(time: number): string {
    return this.addZero(Number.parseInt((time / 60).toString(), 10)) + ':' + this.addZero(Number.parseInt((time % 60).toString(), 10));
  }

  addZero(time) {
    if (time < 10) {
      return '0' + time;
    }
    return time;
  }

  play() {
    if (this.playing) {
      this.player.pause();
      this.playing = false;
    } else {
      this.player.play();
      this.playing = true;
    }
  }

}
