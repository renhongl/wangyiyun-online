import { Component, OnInit, ViewChild } from '@angular/core';

import { ThemeService } from './theme/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'wangyiyun-online';

  theme: any;

  @ViewChild('app') app;

  constructor(private themeService: ThemeService) {
    this.theme = this.themeService.getTheme();
  }

  ngOnInit() {
  }
}
