import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FooterService {

  songDetail = new BehaviorSubject({});

  constructor(private http: HttpClient) { }

  getSongDetail(id) {
    return this.http.get(`/wangyiyun-online/assets/api/song-${id}.json`);
  }
}
