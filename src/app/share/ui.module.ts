import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatCheckboxModule, MatToolbarModule, MatIconModule, MatSliderModule, MatTabsModule } from '@angular/material';
import { NzCarouselModule } from 'ng-zorro-antd';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatButtonModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatIconModule,
    MatSliderModule,
    MatTabsModule,
    NzCarouselModule
  ],
  exports: [
    MatButtonModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatIconModule,
    MatSliderModule,
    MatTabsModule,
    NzCarouselModule
  ]
})
export class UiModule { }
