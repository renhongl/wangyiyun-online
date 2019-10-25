import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  constructor(private http: HttpClient) { }

  getSearchResult(type: string) {
    return this.http.get(`/wangyiyun-online/assets/api/result-${type}.json`);
  }

  search() {
    return this.http.get('https://api.imjad.cn/cloudmusic/?type=search&search_type=1&s=有点甜');
  }
}
