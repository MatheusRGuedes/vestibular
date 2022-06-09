import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { VestibularNewComponent } from "./pages/vestibular/vestibular-new/vestibular-new.component";

// Qualquer rota nova na aplicação, adicionar acima da vazia ('')
const appRoutes :Routes = [
    { 
        path: "vestibular", 
        loadChildren: () => import("./pages/vestibular/vestibular.module").then(m => m.VestibularModule)
    },
    
    { path: '', component: VestibularNewComponent },
    { path: '**', component: VestibularNewComponent }
]

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}