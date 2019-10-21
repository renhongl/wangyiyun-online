import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatCheckboxModule, MatToolbarModule, MatIconModule, MatSliderModule, MatTabsModule,
  MatPaginatorModule,
  MatDialogModule } from '@angular/material';
import { NzCarouselModule, NzPopoverModule, NzButtonModule   } from 'ng-zorro-antd';

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
    NzButtonModule 
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
    NzButtonModule
  ]
})
export class UiModule { }
