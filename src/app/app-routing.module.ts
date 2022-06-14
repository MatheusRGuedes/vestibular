import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { VestibularListComponent } from "./pages/vestibular/vestibular-list/vestibular-list.component";

// Qualquer rota nova na aplicação, adicionar acima da vazia ('')
const appRoutes :Routes = [
    { 
        path: "vestibulares", 
        loadChildren: () => import("./pages/vestibular/vestibular.module").then(m => m.VestibularModule)
    },
    {
        path: "vestibulares/:idVestibular/salas",
        loadChildren: () => import("./pages/sala/sala.module").then(m => m.SalaModule)
    },
    {
        path: "vestibulares/:idVestibular/cursos",
        loadChildren: () => import("./pages/curso/curso.module").then(m => m.CursoModule)
    },
    
    { path: '', component: VestibularListComponent },
    { path: '**', component: VestibularListComponent }
]

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}