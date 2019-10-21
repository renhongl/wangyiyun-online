import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { PlayingService } from './playing.service';

@Component({
  selector: 'app-playing',
  templateUrl: './playing.component.html',
  styleUrls: ['./playing.component.scss']
})
export class PlayingComponent implements OnInit {

  @Output()
  close = new EventEmitter<string>();

  songDetail: any;

  constructor(private playingSer: PlayingService) { }

  ngOnInit() {
    this.playingSer.getSongDetail('0001').subscribe(data => {
      this.songDetail = data;
    });
  }

  closePanel() {
    this.close.emit('close');
  }

}
