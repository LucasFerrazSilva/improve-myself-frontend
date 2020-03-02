import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FinantialControlComponent } from './finantial-control/finantial-control.component';


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'controle-financeiro', component: FinantialControlComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
