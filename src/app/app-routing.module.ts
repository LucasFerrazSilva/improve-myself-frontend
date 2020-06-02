import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FinantialControlComponent } from './finantial-control/finantial-control.component';
import { InvestmentDetailsComponent } from './finantial-control/investments/investment-details/investment-details.component';


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'controle-financeiro', component: FinantialControlComponent},
  {path: 'controle-financeiro/investimento/:id', component: InvestmentDetailsComponent},
  {path: 'controle-financeiro/investimento', component: InvestmentDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
