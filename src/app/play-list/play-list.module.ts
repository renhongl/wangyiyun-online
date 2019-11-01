import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayListComponent } from './play-list.component';
import { HeaderModule } from '../header/header.module';

@NgModule({
  declarations: [PlayListComponent],
  imports: [
    CommonModule,
    HeaderModule
  ],
  exports: [PlayListComponent]
})
export class PlayListModule { }
