import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecommendComponent } from './recommend/recommend.component';
import { MyMusicComponent } from './my-music/my-music.component';
import { CreatedSongsComponent } from './created-songs/created-songs.component';
import { PlayingPreviewComponent } from './playing-preview/playing-preview.component';

@NgModule({
  declarations: [RecommendComponent, MyMusicComponent, CreatedSongsComponent, PlayingPreviewComponent],
  imports: [
    CommonModule
  ],
  exports: [RecommendComponent, MyMusicComponent, CreatedSongsComponent, PlayingPreviewComponent]
})
export class NavigationModule { }
