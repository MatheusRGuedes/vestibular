import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {VestibularEditComponent} from './vestibular-edit/vestibular-edit.component';
import {VestibularListComponent} from './vestibular-list/vestibular-list.component';
import {VestibularNewComponent} from './vestibular-new/vestibular-new.component';
import {VestibularAtribuirComponent} from './vestibular-atribuir/vestibular-atribuir.component';

// caso houver mais rotas, colocar em cima dessa rota vazia
const routes: Routes = [
  { path: 'novo', component: VestibularNewComponent },
  { path: 'editar/:id', component: VestibularEditComponent },
  { path: 'atribuir/:id', component: VestibularAtribuirComponent },
  { path: '', component: VestibularListComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VestibularRoutingModule { }
