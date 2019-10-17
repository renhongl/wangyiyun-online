import { Component, OnInit, ViewChild } from '@angular/core';

import { ThemeService } from './theme/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'wangyiyun-online';

  @ViewChild('app') app;

  constructor(private themeService: ThemeService) {

  }

  ngOnInit() {
    this.app.nativeElement.style.background = `url(${this.themeService.getTheme().bgUrl})`;
  }
}
