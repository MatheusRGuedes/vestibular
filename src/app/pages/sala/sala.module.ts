import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SalaRoutingModule } from './sala-routing.module';

import { SalaNewComponent } from './sala-new/sala-new.component';

@NgModule({
  declarations: [
    SalaNewComponent
  ],
  imports: [
    CommonModule,
    SalaRoutingModule,
    ReactiveFormsModule
  ]
})
export class SalaModule { }
