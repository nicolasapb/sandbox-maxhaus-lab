import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: 'payments', loadChildren: './pages/payments/payments.module#PaymentsModule'},
  { path: 'simulations', loadChildren: './pages/simulations/simulations.module#SimulationsModule'},
  { path: 'savings', loadChildren: './pages/savings/savings.module#SavingsModule'},
  { path: 'reports', loadChildren: './pages/reports/reports.module#ReportsModule'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
