import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CursoRoutingModule } from './curso-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from 'src/app/core/core.module';
import { CursoNewComponent } from './curso-new/curso-new.component';
import {CursoListComponent} from './curso-list/curso-list.component';
import {CursoEditComponent} from './curso-edit/curso-edit.component';

@NgModule({
  declarations: [
    CursoNewComponent,
    CursoListComponent,
    CursoEditComponent
  ],
  imports: [
    CommonModule,
    CursoRoutingModule,
    ReactiveFormsModule,
    CoreModule
  ]
})
export class CursoModule { }
