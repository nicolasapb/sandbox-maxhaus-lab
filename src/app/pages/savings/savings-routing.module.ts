import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SavingListComponent } from './saving-list/saving-list.component';
import { SavingFormComponent } from './saving-form/saving-form.component';


const routes: Routes = [
  {path: '', component: SavingListComponent},
  { path: 'new', component: SavingFormComponent },
  { path: ':id/edit', component: SavingFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SavingsRoutingModule { }
