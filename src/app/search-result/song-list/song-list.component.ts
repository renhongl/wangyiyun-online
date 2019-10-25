import { Component, OnInit, Input } from '@angular/core';
import { HomeService } from 'src/app/home/home.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-search-song-list',
  templateUrl: './song-list.component.html',
  styleUrls: ['./song-list.component.scss']
})
export class SongListComponent implements OnInit {

  @Input() songList;
  playList: any;

  constructor(private homeSer: HomeService, private message: NzMessageService) { }

  ngOnInit() {
    this.homeSer.playList.subscribe(data => {
      this.playList = data;
    });
  }

  playThisSong(song) {
    let newSong = Object.assign({}, song);
    newSong.current = true;
    const newList = Object.assign([], this.playList);
    newList.forEach(item => {
        item.current = false;
    });
    newList.push(newSong);
    this.homeSer.playList.next(this.unique(newList));
    this.message.success(`正在播放：${song.name}`);
  }

  unique(list) {
    const temp = [];
    list.forEach(item => {
      let has = false;
      temp.forEach((ite, index) => {
        if (item.id === ite.id) {
          has = true;
          if (item.current) {
            temp[index] = item;
          }
        }
      });
      if (!has) {
        temp.push(item);
      }
    });
    return temp;
  }

  addThisSong(song) {
    const newList = Object.assign([], this.playList);
    newList.push(song);
    this.homeSer.playList.next(this.unique(newList));
    this.message.success(`添加成功：${song.name}`);
  }

}
