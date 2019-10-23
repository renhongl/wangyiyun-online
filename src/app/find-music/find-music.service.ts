import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FindMusicService {

  constructor(private http: HttpClient) { }

  getSongType(id: string) {
    return this.http.get(`/wangyiyun-online/assets/api/song-type-${id}.json`);
  }

  getSongTypeRecommend(id: string) {
    return this.http.get(`/wangyiyun-online/assets/api/song-type-${id}.json`);
  }
}
