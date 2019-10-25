import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';

import { NavigationModule } from '../navigation/navigation.module';
import { FindMusicModule } from '../find-music/find-music.module';
import { FindMusicComponent } from '../find-music/find-music.component';

import { PrivateFmModule } from '../private-fm/private-fm.module';
import { PrivateFmComponent } from '../private-fm/private-fm.component';

import { SongListComponent } from '../song-list/song-list.component';
import { SearchResultComponent } from '../search-result/search-result.component';

import { FooterModule } from '../footer/footer.module';
import { PlayingModule } from '../playing/playing.module';
import { PlayListModule } from '../play-list/play-list.module';
import { SongListModule } from '../song-list/song-list.module';
import { SearchResultModule } from '../search-result/search-result.module';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: '',
        component: FindMusicComponent
      },
      {
        path: 'findMusic',
        component: FindMusicComponent
      },
      {
        path: 'privateFm',
        component: PrivateFmComponent
      },
      {
        path: 'songList/:id',
        component: SongListComponent
      },
      {
        path: 'searchResult/:keyword',
        component: SearchResultComponent
      }
    ]
  }
];

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NavigationModule,
    FindMusicModule,
    PrivateFmModule,
    FooterModule,
    PlayingModule,
    PlayListModule,
    SongListModule,
    SearchResultModule
  ]
})
export class HomeModule { }
