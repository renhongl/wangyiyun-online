import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-find-songs',
  templateUrl: './songs.component.html',
  styleUrls: ['./songs.component.scss']
})
export class SongsComponent implements OnInit {

  @Input() songs;

  constructor() { }

  ngOnInit() {
  }

}
