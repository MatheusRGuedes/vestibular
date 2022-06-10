import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VestibularRoutingModule } from './vestibular-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from 'src/app/core/core.module';

import { VestibularNewComponent } from './vestibular-new/vestibular-new.component';
import { VestibularListComponent } from './vestibular-list/vestibular-list.component';

@NgModule({
  declarations: [
    VestibularNewComponent,
    VestibularListComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    VestibularRoutingModule,
    CoreModule
  ], 
  exports: [
    VestibularNewComponent
  ]
})
export class VestibularModule { }
