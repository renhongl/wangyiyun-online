import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatCheckboxModule, MatToolbarModule, MatIconModule, MatSliderModule, MatTabsModule,
  MatPaginatorModule,
  MatDialogModule } from '@angular/material';
import { NzCarouselModule, NzPopoverModule, NzButtonModule, NzMessageModule } from 'ng-zorro-antd';

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
    NzCarouselModule,
    MatPaginatorModule,
    MatDialogModule,
    NzPopoverModule,
    NzButtonModule,
    NzMessageModule
  ],
  exports: [
    MatButtonModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatIconModule,
    MatSliderModule,
    MatTabsModule,
    NzCarouselModule,
    MatPaginatorModule,
    MatDialogModule,
    NzPopoverModule,
    NzButtonModule,
    NzMessageModule
  ]
})
export class UiModule { }
