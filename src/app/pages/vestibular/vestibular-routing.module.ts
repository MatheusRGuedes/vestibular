import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VestibularNewComponent } from './vestibular-new/vestibular-new.component';

// caso houver mais rotas, colocar em cima dessa rota vazia
const routes: Routes = [
  { path: '', component: VestibularNewComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VestibularRoutingModule { }
