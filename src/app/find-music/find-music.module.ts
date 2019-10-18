import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FindMusicComponent } from './find-music.component';
import { UiModule } from '../share/ui.module';
import { CardComponent } from './card/card.component';

@NgModule({
  declarations: [FindMusicComponent, CardComponent],
  imports: [
    CommonModule,
    UiModule
  ],
  exports: [FindMusicComponent]
})
export class FindMusicModule { }
