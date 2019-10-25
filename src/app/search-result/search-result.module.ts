import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchResultComponent } from './search-result.component';
import { UiModule } from '../share/ui.module';
import { SongListComponent } from './song-list/song-list.component';

@NgModule({
  declarations: [SearchResultComponent, SongListComponent],
  imports: [
    CommonModule,
    UiModule
  ],
  exports: [SearchResultComponent]
})
export class SearchResultModule { }
