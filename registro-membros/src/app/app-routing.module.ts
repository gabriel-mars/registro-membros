import { CongregacaoCrudComponent } from './views/congregacao-crud/congregacao-crud.component';
import { MembroDeleteComponent } from './components/membro/membro-delete/membro-delete.component';
import { MembroUpdateComponent } from './components/membro/membro-update/membro-update.component';
import { MembroCreateComponent } from './components/membro/membro-create/membro-create.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { MembrosCrudComponent } from './views/membros-crud/membros-crud.component';

const routes: Routes = [
  {
    path: "",
    component: HomeComponent
  },
  {
    path: "membros",
    component: MembrosCrudComponent
  },
  {
    path: "membros/create",
    component: MembroCreateComponent
  },
  {
    path: "membros/update/:id",
    component: MembroUpdateComponent
  },
  {
    path: "membros/delete/:id",
    component: MembroDeleteComponent
  },
  {
    path: "congregacoes",
    component: CongregacaoCrudComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
