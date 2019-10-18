import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-find-music',
  templateUrl: './find-music.component.html',
  styleUrls: ['./find-music.component.scss']
})
export class FindMusicComponent implements OnInit {

  array = ['/assets/images/p1.jpg', '/assets/images/p2.png', '/assets/images/p1.jpg', '/assets/images/p2.png', '/assets/images/p1.jpg', '/assets/images/p2.png'];

  constructor() { }

  ngOnInit() {
  }

}
