import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: 'payments', loadChildren: './pages/payments/payments.module#PaymentsModule'},
  { path: 'simulations', loadChildren: './pages/simulations/simulations.module#SimulationsModule'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
