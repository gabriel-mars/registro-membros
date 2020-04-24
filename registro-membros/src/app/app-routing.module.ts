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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
