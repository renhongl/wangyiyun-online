import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  searchResult = new BehaviorSubject([]);
  theme = new BehaviorSubject('#e64a19');

  constructor(private http: HttpClient) { }

  getSearchResult(type: string) {
    return this.http.get(`/wangyiyun-online/assets/api/result-${type}.json`);
  }

  search(keyWord, type, offset) {
    return this.http.get(`https://api.imjad.cn/cloudmusic/?type=search&search_type=${type}&s=${keyWord}&limit=30&offset=${offset}`);
  }
}
