import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CpfPipe } from './pipes/cpf-pipe';

@NgModule({
  declarations: [
    CpfPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CpfPipe
  ]
})
export class SharedModule { }
