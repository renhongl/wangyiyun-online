import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FooterService } from '../footer/footer.service';
import { interval } from 'rxjs';

@Component({
  selector: 'app-playing',
  templateUrl: './playing.component.html',
  styleUrls: ['./playing.component.scss']
})
export class PlayingComponent implements OnInit {

  @Output()
  close = new EventEmitter<string>();

  songDetail: any;
  songLyric: any;
  currentTime: any;
  player: any;
  checkTimer: any;
  rotation = 0;

  constructor(private footerSer: FooterService) { }

  ngOnInit() {
    this.footerSer.songDetail.subscribe(data => {
      this.songDetail = data;
    });

    this.footerSer.songLyric.subscribe(data => {
      this.songLyric = data;
    });

    this.footerSer.currentTime.subscribe(data => {
      this.moveLyric(data);
    });

    this.footerSer.player.subscribe(data => {
      this.player = data;
      this.player.onplaying = (() => {
        this.start();
      });
    });

    this.checkStatus();
  }

  checkStatus() {
    this.checkTimer = interval(1000);
    this.checkTimer.subscribe(val => {
      if (this.player.paused || this.player.stoped || this.player.ended) {
        this.stop();
      } else {
        this.start();
      }
    });
  }

  start() {
    if (this.rotation < 35) {
      if (document.querySelector('.bar')) {
        document.querySelector('.bar')['style'].transform = `scale(0.6, 0.6) rotate(${this.rotation++}deg)`;
        requestAnimationFrame(() => {
          this.start();
        });
      }
    }
    setTimeout(() => {
      if (document.querySelector('.detail-con .img')) {
        document.querySelector('.detail-con .img')['style']['animation'] = 'rotate 20s linear infinite';
        document.querySelector('.detail-con .img')['style']['animation-play-state'] = 'running';
      }
    }, 500);
  }

  stop() {
    if (this.rotation > 0) {
      document.querySelector('.bar')['style'].transform = `scale(0.6, 0.6) rotate(${this.rotation--}deg)`;
      requestAnimationFrame(() => {
        this.stop();
      });
    }
    setTimeout(() => {
      // document.querySelector('.detail-con .img')['style']['animation'] = 'none';
      if (document.querySelector('.detail-con .img')) {
        document.querySelector('.detail-con .img')['style']['animation-play-state'] = 'paused';
      }
    }, 500);
  }

  moveLyric(time) {
    const newTime = this.setMinuts(time);
    const current = document.querySelector('div[time="' + newTime + '"]');
    if (current) {
      Array.from(document.querySelectorAll('.lyric div')).forEach(item => {
        item['style']['color'] = '#000';
      });
      current.scrollIntoView(true);
      current['style']['color'] = '#fff';
      const top = document.querySelector('.lyric').scrollTop;
      document.querySelector('.lyric')['scrollTop'] = top - 100;
    }
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

  closePanel() {
    this.close.emit('close');
  }

}
