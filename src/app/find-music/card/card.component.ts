import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-find-music-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  img = '/assets/images/bg1.jpg';

  constructor() { }

  ngOnInit() {
  }

}
