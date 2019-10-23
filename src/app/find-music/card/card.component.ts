import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-find-music-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input() song;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  showList(id) {
    this.router.navigate([`/home/songList/${id}`]);
  }

}
