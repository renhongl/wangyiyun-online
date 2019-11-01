import { Component, OnInit } from '@angular/core';
import { HeaderService } from './header.service';
import { Router } from '@angular/router';
import isElectron from 'is-electron';
import { ElectronService } from 'ngx-electron';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  visible: boolean;
  results: any;
  searching: string;
  electron: boolean;
  theme: string;
  colors = ['#d32f2f', '#c2185b', '#7b1fa2', '#512da8', '#303f9f', '#1976d2', '#0288d1', '#0097a7', '#00796b', '#388e3c', '#fbc02d', '#f57c00', '#e64a19', '#5d4037', '#616161', '#424242'];
  showTheme: boolean;

  constructor(private headerSer: HeaderService, private router: Router, private electronSer: ElectronService) { }

  ngOnInit() {
    document.body.addEventListener('click', (e) => {
      this.visible = false;
    });

    this.headerSer.getSearchResult('all').subscribe(data => {
      this.results = data;
    });

    this.electron = isElectron();

    this.headerSer.theme.subscribe(data => {
      this.theme = data;
      let style = document.createElement('style');
      style.type = 'text/css';
      style.innerHTML = `.mat-tab-group.mat-primary .mat-ink-bar, .mat-tab-nav-bar.mat-primary .mat-ink-bar{background-color: ${data} !important}.recommend .selected{border-left: 4px solid ${data} !important}`;
      document.getElementsByTagName('head')[0].appendChild(style);
    });
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

  close() {
    this.electronSer.ipcRenderer.sendSync('close');
  }

  changeTheme(value) {
    this.headerSer.theme.next(value);
  }

  toggleThemeCon() {
    this.showTheme = !this.showTheme;
  }
}
