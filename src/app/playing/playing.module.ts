import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayingComponent } from './playing.component';
import { FooterModule } from '../footer/footer.module';

@NgModule({
  declarations: [PlayingComponent],
  imports: [
    CommonModule,
    FooterModule
  ],
  exports: [PlayingComponent]
})
export class PlayingModule { }
