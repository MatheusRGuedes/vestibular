import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SalaRoutingModule } from './sala-routing.module';

import { SalaNewComponent } from './sala-new/sala-new.component';
import {SalaListComponent} from './sala-list/sala-list.component';
import {SalaEditComponent} from './sala-edit/sala-edit.component';

@NgModule({
  declarations: [
    SalaListComponent,
    SalaEditComponent,
    SalaNewComponent
  ],
  imports: [
    CommonModule,
    SalaRoutingModule,
    ReactiveFormsModule
  ]
})
export class SalaModule { }
