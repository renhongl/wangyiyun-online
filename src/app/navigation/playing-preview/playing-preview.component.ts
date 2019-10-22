import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FooterService } from '../../footer/footer.service';

@Component({
  selector: 'app-playing-preview',
  templateUrl: './playing-preview.component.html',
  styleUrls: ['./playing-preview.component.scss']
})
export class PlayingPreviewComponent implements OnInit {

  @Output()
  open = new EventEmitter();

  songDetail: any;

  constructor(private footerSer: FooterService) { }

  ngOnInit() {
    this.footerSer.songDetail.subscribe(data => {
      this.songDetail = data;
    });
  }

  openPlaying() {
    this.open.emit('open');
  }

}
