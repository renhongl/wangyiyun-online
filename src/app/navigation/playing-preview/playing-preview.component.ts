import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-playing-preview',
  templateUrl: './playing-preview.component.html',
  styleUrls: ['./playing-preview.component.scss']
})
export class PlayingPreviewComponent implements OnInit {

  @Output()
  open = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  openPlaying() {
    this.open.emit('open');
  }

}
