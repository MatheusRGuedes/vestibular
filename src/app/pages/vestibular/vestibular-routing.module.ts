import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VestibularListComponent } from './vestibular-list/vestibular-list.component';
import { VestibularNewComponent } from './vestibular-new/vestibular-new.component';

// caso houver mais rotas, colocar em cima dessa rota vazia
const routes: Routes = [
  { path: 'novo', component: VestibularNewComponent },
  { path: '', component: VestibularListComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VestibularRoutingModule { }
