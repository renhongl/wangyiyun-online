import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FooterService {

  songDetail = new BehaviorSubject({});
  songLyric = new BehaviorSubject({});
  currentTime = new BehaviorSubject(0);
  player = new BehaviorSubject({});
  playing = new BehaviorSubject(false);

  constructor(private http: HttpClient) { }

  // getSongDetail(id) {
  //   return this.http.get(`/wangyiyun-online/assets/api/song-${id}.json`);
  // }

  getSongDetail(id) {
    return this.http.get(`https://api.imjad.cn/cloudmusic/?type=song&id=${id}`);
  }

  getLyric(id) {
    return this.http.get(`https://api.imjad.cn/cloudmusic/?type=lyric&id=${id}`);
  }
}
