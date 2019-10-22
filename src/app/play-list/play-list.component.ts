import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { PlayListService } from './play-list.service';
import { FooterService } from '../footer/footer.service';

@Component({
  selector: 'app-play-list',
  templateUrl: './play-list.component.html',
  styleUrls: ['./play-list.component.scss']
})
export class PlayListComponent implements OnInit {

  @Output()
  close = new EventEmitter();

  showList = true;
  playList: any;
  currentSong: any;

  constructor(private playListSer: PlayListService, private footSer: FooterService) { }

  ngOnInit() {
    this.playListSer.getPlayList().subscribe(data => {
      this.playList = data;
    });

    this.footSer.songDetail.subscribe(data => {
      this.currentSong = data;
    });
  }

  closePlayList() {
    this.close.emit('close');
  }

  showListPage() {
    this.showList = true;
  }

  showHistory() {
    this.showList = false;
  }

  playThisMusic(item) {
    this.footSer.getSongDetail(item.id).subscribe(data => {
      this.footSer.songDetail.next(data);
      this.currentSong = data;
    });
  }

}
