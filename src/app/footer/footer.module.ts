import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer.component';

import { UiModule } from '../share/ui.module';
import { FormsModule } from '@angular/forms';
import { HeaderModule } from '../header/header.module';

@NgModule({
  declarations: [FooterComponent],
  imports: [
    CommonModule,
    UiModule,
    FormsModule
  ],
  exports: [FooterComponent]
})
export class FooterModule { }
