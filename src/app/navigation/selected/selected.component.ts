import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-selected',
  templateUrl: './selected.component.html',
  styleUrls: ['./selected.component.scss']
})
export class SelectedComponent implements OnInit {

  @Input() icon: string;
  @Input() label: any;
  @Input() path: string;
  selected: boolean;

  constructor(private router: Router) {
    router.events.subscribe((val) => {
      this.checkSelected(router.url);
    });
  }

  checkSelected(url) {
    if (this.path === url) {
      this.selected = true;
    } else {
      this.selected = false;
    }
  }

  ngOnInit() {
    this.checkSelected(this.router.url);
  }

}
