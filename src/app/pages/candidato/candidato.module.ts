import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CandidatoRoutingModule } from './candidato-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from 'src/app/core/core.module';
import { CandidatoNewComponent } from './candidato-new/candidato-new.component';

@NgModule({
  declarations: [
    CandidatoNewComponent
  ],
  imports: [
    CommonModule,
    CandidatoRoutingModule,
    ReactiveFormsModule,
    CoreModule
  ]
})
export class CandidatoModule { }
