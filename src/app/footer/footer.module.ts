import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer.component';

import { UiModule } from '../share/ui.module';

@NgModule({
  declarations: [FooterComponent],
  imports: [
    CommonModule,
    UiModule
  ],
  exports: [FooterComponent]
})
export class FooterModule { }
