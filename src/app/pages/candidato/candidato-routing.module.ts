import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {CandidatoNewComponent} from './candidato-new/candidato-new.component';
import {CandidatoListComponent} from './candidato-list/candidato-list.component';
import {CandidatoEditComponent} from './candidato-edit/candidato-edit.component';

const routes: Routes = [
  { path: 'novo', component: CandidatoNewComponent },
  { path: 'edit', component: CandidatoEditComponent },
  { path: '', component: CandidatoListComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CandidatoRoutingModule { }
