import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrivateFmComponent } from './private-fm.component';

@NgModule({
  declarations: [PrivateFmComponent],
  imports: [
    CommonModule
  ],
  exports: [PrivateFmComponent]
})
export class PrivateFmModule { }
