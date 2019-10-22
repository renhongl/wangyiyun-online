import { Component, OnInit, ViewChild, OnDestroy, Output } from '@angular/core';
import { FooterService } from './footer.service';
import { interval } from 'rxjs';
import { EventEmitter } from 'protractor';

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
  loop: boolean;
  sliderMax: number;
  sliderMin: number;
  sliderValue: number;
  volume: number;

  @Output()
  open = new EventEmitter();

  constructor(private footerSer: FooterService) { }

  ngOnInit() {
    this.footerSer.songDetail.subscribe(data => {
      this.songDetail = data;
    });
    this.footerSer.getSongDetail('0001').subscribe(data => {
      this.footerSer.songDetail.next(data);
    });

    this.player = this.playerRef.nativeElement;

    this.volume = 0.5;

    this.checkStatus();
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
