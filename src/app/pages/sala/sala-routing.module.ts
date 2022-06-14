import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SalaNewComponent } from './sala-new/sala-new.component';

const routes: Routes = [
  { path: 'novo', component: SalaNewComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalaRoutingModule { }
