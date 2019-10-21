import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-find-music-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input() song;

  constructor() { }

  ngOnInit() {
  }

}
