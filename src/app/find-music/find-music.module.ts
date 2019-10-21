import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FindMusicComponent } from './find-music.component';
import { UiModule } from '../share/ui.module';
import { CardComponent } from './card/card.component';
import { RecommendComponent } from './recommend/recommend.component';
import { SongsComponent } from './songs/songs.component';

@NgModule({
  declarations: [FindMusicComponent, CardComponent, RecommendComponent, SongsComponent],
  imports: [
    CommonModule,
    UiModule
  ],
  exports: [FindMusicComponent]
})
export class FindMusicModule { }
