import { Component, OnInit } from '@angular/core';
import { HeaderService } from './header.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  visible: boolean;
  results: any;

  constructor(private headerSer: HeaderService) { }

  ngOnInit() {
    document.body.addEventListener('click', (e) => {
      this.visible = false;
    });

    this.headerSer.getSearchResult('all').subscribe(data => {
      this.results = data;
    });
  }

  change(e): void {
    this.visible = !this.visible;
    e.stopPropagation();
  }
}
