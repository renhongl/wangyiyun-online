import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FooterService } from '../footer/footer.service';
import { interval } from 'rxjs';
import { Router } from '@angular/router';

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
  playing: any;
  checkTimer: any;
  rotation = 0;
  starting: boolean;

  constructor(private footerSer: FooterService, private router: Router) { }

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

    this.footerSer.playing.subscribe(data => {
      this.playing = data;
      if(this.playing && !this.starting) {
        this.start();
        this.starting = true;
      } else {
        this.stop();
        this.starting = false;
      }
    });

    this.router.events.subscribe(data => {
      this.closePanel();
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
    let index = 0;
    if (current) {
      Array.from(document.querySelectorAll('.lyric div')).forEach((item, i) => {
        item['style']['color'] = '#000';
        if (item.getAttribute('time') === current.getAttribute('time')) {
          index = i;
        }
      });
      // current.scrollIntoView(true);
      current['style']['color'] = '#5b8be6';
      // const top = document.querySelector('.lyric').scrollTop;
      document.querySelector('.lyric')['scrollTop'] = 30 * index - 50;
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
