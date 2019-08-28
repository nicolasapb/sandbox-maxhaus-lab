import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SavingListComponent } from './saving-list/saving-list.component';


const routes: Routes = [
  {path: '', component: SavingListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SavingsRoutingModule { }
