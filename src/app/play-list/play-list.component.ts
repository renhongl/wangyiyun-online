import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { PlayListService } from './play-list.service';

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

  constructor(private playListSer: PlayListService) { }

  ngOnInit() {
    this.playListSer.getPlayList().subscribe(data => {
      this.playList = data;
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

}
