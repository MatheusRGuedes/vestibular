import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VestibularRoutingModule } from './vestibular-routing.module';
import { VestibularNewComponent } from './vestibular-new/vestibular-new.component';
import { ReactiveFormsModule } from '@angular/forms';
import { VestibularService } from 'src/app/core/services/vestibular.service';
import { CoreModule } from 'src/app/core/core.module';

@NgModule({
  declarations: [
    VestibularNewComponent
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
