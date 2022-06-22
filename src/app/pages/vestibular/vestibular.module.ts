//Modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VestibularRoutingModule } from './vestibular-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from 'src/app/core/core.module';

//Components
import { VestibularNewComponent } from './vestibular-new/vestibular-new.component';
import { VestibularListComponent } from './vestibular-list/vestibular-list.component';
import { VestibularEditComponent } from './vestibular-edit/vestibular-edit.component';
import {VestibularAtribuirComponent} from "./vestibular-atribuir/vestibular-atribuir.component";

@NgModule({
  declarations: [
    VestibularNewComponent,
    VestibularListComponent,
    VestibularEditComponent,
    VestibularAtribuirComponent
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
