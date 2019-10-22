import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-find-recommend',
  templateUrl: './recommend.component.html',
  styleUrls: ['./recommend.component.scss']
})
export class RecommendComponent implements OnInit {

  array = ['/wangyiyun-online/assets/images/p2.jpg', '/wangyiyun-online/assets/images/p3.jpg', '/wangyiyun-online/assets/images/p5.jpg'];

  @Input() songs;

  constructor() { }

  ngOnInit() {
  }

}
