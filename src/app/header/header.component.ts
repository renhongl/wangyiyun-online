import { Component, OnInit } from '@angular/core';
import { HeaderService } from './header.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  visible: boolean;
  results: any;
  searching: string;
  electron: string;

  constructor(private headerSer: HeaderService, private router: Router) { }

  ngOnInit() {
    document.body.addEventListener('click', (e) => {
      this.visible = false;
    });

    this.headerSer.getSearchResult('all').subscribe(data => {
      this.results = data;
    });

    // if (window && window.process && window.process['type']) {
    //   this.electron = window.process['type'];
    //   console.log(this.electron);
    // }
  }

  searchSong(e) {
    const keyWord = e.target.value;
    // this.headerSer.search(keyWord, defaultType).subscribe(data => {
    //   this.headerSer.searchResult.next(data['result']);
    //   this.router.navigate(['/home/searchResult/' + keyWord]);
    // });
    this.router.navigate(['/home/searchResult/' + keyWord]);
  }

  updateSearching(name) {
    this.searching = name;
    // this.headerSer.search(name, defaultType).subscribe(data => {
    //   this.headerSer.searchResult.next(data['result']);
    //   this.router.navigate(['/home/searchResult/' + name]);
    // });
    this.router.navigate(['/home/searchResult/' + name]);
  }

  change(e): void {
    this.visible = !this.visible;
    e.stopPropagation();
  }
}
