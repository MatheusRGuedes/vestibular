import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CursoNewComponent} from './curso-new/curso-new.component';
import {CursoListComponent} from './curso-list/curso-list.component';
import {CursoEditComponent} from './curso-edit/curso-edit.component';

const routes: Routes = [
    { path: 'novo', component: CursoNewComponent },
    { path: 'edit/:cursoUUID', component: CursoEditComponent },
    { path: '', component: CursoListComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CursoRoutingModule { }
