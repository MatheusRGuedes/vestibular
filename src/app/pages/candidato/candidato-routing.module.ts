import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CandidatoListComponent } from "./candidato-list/candidato-list.component";
import { CandidatoNewComponent } from "./candidato-new/candidato-new.component";

const routes: Routes = [
    { path: 'novo', component: CandidatoNewComponent },
    { path: 'editar/:id', component: CandidatoNewComponent },
    { path: '', component: CandidatoListComponent }
];
  
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CandidatoRoutingModule { }