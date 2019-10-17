import { Injectable } from '@angular/core';

import { BGURL } from '../share/config';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  index = 1;

  constructor() { }

  getTheme(): any {
    return {
      bgUrl: BGURL[this.index]
    };
  }
}
