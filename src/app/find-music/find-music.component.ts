import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-find-music',
  templateUrl: './find-music.component.html',
  styleUrls: ['./find-music.component.scss']
})
export class FindMusicComponent implements OnInit {

  array = ['/wangyiyun-online/assets/images/p1.jpg', '/wangyiyun-online/assets/images/p2.png', '/wangyiyun-online/assets/images/p1.jpg',
   '/wangyiyun-online/assets/images/p2.png', '/wangyiyun-online/assets/images/p1.jpg', '/wangyiyun-online/assets/images/p2.png'];

  constructor() { }

  ngOnInit() {
  }

}
