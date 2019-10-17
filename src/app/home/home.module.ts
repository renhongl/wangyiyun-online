import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';

import { NavigationModule } from '../navigation/navigation.module';
import { FindMusicModule } from '../find-music/find-music.module';
import { FindMusicComponent } from '../find-music/find-music.component';

import { PrivateFmModule } from '../private-fm/private-fm.module';
import { PrivateFmComponent } from '../private-fm/private-fm.component';

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
    PrivateFmModule
  ]
})
export class HomeModule { }
