import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CursoNewComponent } from "./curso-new/curso-new.component";

const routes: Routes = [
    { path: 'novo', component: CursoNewComponent }
];
  
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CursoRoutingModule { }