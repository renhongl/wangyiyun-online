import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  playList = new BehaviorSubject([]);

  constructor(private http: HttpClient) { }

  getPlayList(id) {
    return this.http.get(`/wangyiyun-online/assets/api/song-list-${id}.json`);
  }
}
