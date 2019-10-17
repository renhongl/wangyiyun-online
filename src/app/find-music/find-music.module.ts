import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FindMusicComponent } from './find-music.component';

@NgModule({
  declarations: [FindMusicComponent],
  imports: [
    CommonModule
  ],
  exports: [FindMusicComponent]
})
export class FindMusicModule { }
