import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SongListService {

  constructor(private http: HttpClient) { }

  // getSongList(id) {
  //   return this.http.get(`/wangyiyun-online/assets/api/song-list-${id}.json`);
  // }

  getSongList(id) {
    return this.http.get(`https://api.imjad.cn/cloudmusic/?type=playlist&id=${id}`);
  }
}
