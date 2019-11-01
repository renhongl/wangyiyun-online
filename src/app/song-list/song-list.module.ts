import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SongListComponent } from './song-list.component';
import { UiModule } from '../share/ui.module';
import { HeaderModule } from '../header/header.module';

@NgModule({
  declarations: [SongListComponent],
  imports: [
    CommonModule,
    UiModule,
    HeaderModule
  ],
  exports: [SongListComponent]
})
export class SongListModule { }
