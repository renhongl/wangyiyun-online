import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  searchResult = new BehaviorSubject([]);

  constructor(private http: HttpClient) { }

  getSearchResult(type: string) {
    return this.http.get(`/wangyiyun-online/assets/api/result-${type}.json`);
  }

  search(keyWord, type, offset) {
    return this.http.get(`https://music.163.com/api/search/get?s=${keyWord}&type=${type}&total=true&limit=30&offset=${offset}`);
  }
}
