import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { FormsModule } from '@angular/forms';
import { NgxElectronModule } from 'ngx-electron';

@NgModule({
  declarations: [HeaderComponent],
  imports: [
    CommonModule,
    FormsModule,
    NgxElectronModule
  ],
  exports: [HeaderComponent]
})
export class HeaderModule { }
