import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FooterService } from '../footer/footer.service';

@Component({
  selector: 'app-playing',
  templateUrl: './playing.component.html',
  styleUrls: ['./playing.component.scss']
})
export class PlayingComponent implements OnInit {

  @Output()
  close = new EventEmitter<string>();

  songDetail: any;

  constructor(private footerSer: FooterService) { }

  ngOnInit() {
    this.footerSer.songDetail.subscribe(data => {
      this.songDetail = data;
    });
  }

  closePanel() {
    this.close.emit('close');
  }

}
