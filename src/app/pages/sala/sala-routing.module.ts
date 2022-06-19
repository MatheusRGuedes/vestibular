import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SalaNewComponent} from './sala-new/sala-new.component';
import {SalaListComponent} from './sala-list/sala-list.component';
import {SalaEditComponent} from './sala-edit/sala-edit.component';

const routes: Routes = [
  { path: 'novo', component: SalaNewComponent },
  { path: 'edit/:salaID', component: SalaEditComponent },
  { path: '', component: SalaListComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalaRoutingModule { }
