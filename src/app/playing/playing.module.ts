import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayingComponent } from './playing.component';


@NgModule({
  declarations: [PlayingComponent],
  imports: [
    CommonModule
  ],
  exports: [PlayingComponent]
})
export class PlayingModule { }
