import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecommendComponent } from './recommend/recommend.component';
import { MyMusicComponent } from './my-music/my-music.component';
import { CreatedSongsComponent } from './created-songs/created-songs.component';
import { PlayingPreviewComponent } from './playing-preview/playing-preview.component';
import { SelectedComponent } from './selected/selected.component';

import { UiModule } from '../share/ui.module';

@NgModule({
  declarations: [RecommendComponent, MyMusicComponent, CreatedSongsComponent, PlayingPreviewComponent, SelectedComponent],
  imports: [
    CommonModule,
    UiModule
  ],
  exports: [RecommendComponent, MyMusicComponent, CreatedSongsComponent, PlayingPreviewComponent]
})
export class NavigationModule { }
