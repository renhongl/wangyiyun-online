import { Component, OnInit, Output } from '@angular/core';
import { EventEmitter } from 'events';

@Component({
  selector: 'app-play-list',
  templateUrl: './play-list.component.html',
  styleUrls: ['./play-list.component.scss']
})
export class PlayListComponent implements OnInit {

  @Output()
  close = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  closePlayList() {
    this.close.emit('close');
  }

}
