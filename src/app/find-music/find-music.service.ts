import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FindMusicService {

  constructor(private http: HttpClient) { }

  getSongs(type: string) {
    return this.http.get(`/wangyiyun-online/assets/api/songs-${type}.json`);
  }
}
