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
  rotation = 0;

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
    this.footerSer.player.next(this.player);
  }

  listenEnded() {
    this.player.onended = () => {
      document.title = '网易云音乐';
      if (this.loopStatus === 0) {// list loop
        this.playingIndex++;
        if (this.playingIndex >= this.playList.length) {
          this.playingIndex = 0;
        }
        this.playThisMusic(this.playList[this.playingIndex]);
      } else if (this.loopStatus === 1) { // single loop
        this.player.play();
      } else if (this.loopStatus === 2) { // random loop
        const n = Number.parseInt((Math.random() * this.playList.length).toString());
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
    const newList = Object.assign([], this.playList);
    newList.forEach(song => {
      if (song.id === item.id) {
        song.current = true;
      } else {
        song.current = false;
      };
    });
    this.homeSer.playList.next(newList);
    // this.footerSer.getSongDetail(item.id).subscribe(data => {
    //   this.footerSer.songDetail.next(this.dataAdapter(data['data'][0]));
    // });
  }

  dataAdapter(data) {
    const current = this.playList.filter(item => item.id === data.id)[0];
    const ret = {
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
          this.footerSer.playing.next(true);
          this.setIndex();
        };
      }
      this.updateLyric(data['id']);
      document.title = this.songDetail.name;
    });
  }

  updateLyric(id) {
    if (!id) {
      return;
    }
    this.footerSer.getLyric(id).subscribe(data => {
      this.footerSer.songLyric.next(data);
    });
  }

  setIndex() {
    this.playList.forEach((item, i) => {
      if (item.id === this.songDetail.id) {
        this.playingIndex = i;
      }
    });
  }

  listenPlayList() {
    this.homeSer.playList.subscribe(data => {
      if (data.length === 0) {
        return;
      }
      this.playList = data;
      const id = this.getCurrentId(data);
      this.footerSer.getSongDetail(id).subscribe(detail => {
        this.footerSer.songDetail.next(this.dataAdapter(detail['data'][0]));
        if (this.songDetail && this.songDetail.id === detail['data'][0]['id']) {
        } else {
          this.playing = false;
          this.footerSer.playing.next(false);
        }
      });
    });
  }

  getCurrentId(data) {
    let ret = data[0].id;
    this.playingIndex = 0;
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
      if (this.player && this.player.currentTime) {
        this.footerSer.currentTime.next(this.player.currentTime);
      }
      this.updateDurationSlider();
      if (this.player.ended && this.playing) {
        this.playing = false;
        this.footerSer.playing.next(false);
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
      this.footerSer.playing.next(false);
    } else {
      this.player.play();
      this.playing = true;
      this.footerSer.playing.next(true);
    }
  }

}
