import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CandidatoNewComponent } from "./candidato-new/candidato-new.component";

const routes: Routes = [
    { path: 'novo', component: CandidatoNewComponent }
];
  
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CandidatoRoutingModule { }