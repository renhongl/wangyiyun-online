import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PlayListService {

  constructor(private http: HttpClient) { }

  getPlayList() {
    return this.http.get(`/wangyiyun-online/assets/api/play-list.json`);
  }
}
