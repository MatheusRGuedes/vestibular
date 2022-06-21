import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {CoreModule} from '../../core/core.module';
import {CandidatoRoutingModule} from './candidato-routing.module';
import {CandidatoNewComponent} from './candidato-new/candidato-new.component';
import {CandidatoEditComponent} from './candidato-edit/candidato-edit.component';
import {CandidatoListComponent} from './candidato-list/candidato-list.component';

@NgModule({
  declarations: [
    CandidatoNewComponent,
    CandidatoEditComponent,
    CandidatoListComponent
  ],
  imports: [
    CommonModule,
    CandidatoRoutingModule,
    ReactiveFormsModule,
    CoreModule
  ]
})
export class CandidatoModule { }
