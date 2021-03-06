import { Component, OnInit } from '@angular/core';
import { HeaderService } from '../header/header.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements OnInit {

  searchResult: any;
  keyWord: string;
  type = 1;

  constructor(private headerSer: HeaderService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.listenSearchResult();
    this.route.params.subscribe(data => {
      this.getResult(data.keyword);
    });
  }

  getResult(keyWord) {
    this.keyWord = keyWord;
    this.headerSer.search(keyWord, this.type, 1).subscribe(data => {
      this.searchResult = {songs: []};
      this.searchResult = this.dataAdapter(data['result']);
    });
  }

  changePage(e) {
    this.headerSer.search(this.keyWord, this.type, e.pageIndex + 1).subscribe(data => {
      this.searchResult = {songs: []};
      this.searchResult = this.dataAdapter(data['result']);
    });
  }

  dataAdapter(data) {
    data.songs = data.songs.map(item => {
      return {
        id: item.id,
        name: item.name,
        author: item.ar[0].name,
        zhuanji: item.al.name,
        time: this.timeFormat(item.dt),
        vip: true,
        preview: item.al.picUrl
      };
    });
    return data;
  }

  timeFormat(time) {
    let mins = Number.parseInt((time / 1000 / 60).toString());
    let secs = Number.parseInt((time / 1000 % 60).toString());
    return this.addZero(mins) + ':' + this.addZero(secs);
  }

  addZero(time) {
    if (time < 10) {
      return '0' + time;
    }
    return time;
  }

  listenSearchResult() {
    this.headerSer.searchResult.subscribe(data => {
      this.searchResult = {songs: []};
      this.searchResult = data;
    });
  }

}
