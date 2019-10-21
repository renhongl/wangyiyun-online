import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PlayingService {

  constructor(private http: HttpClient) { }

  getSongDetail(id) {
    return this.http.get(`/wangyiyun-online/assets/api/song-${id}.json`);
  }
}
