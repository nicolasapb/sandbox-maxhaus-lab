import { NgModule } from '@angular/core';

import { SavingsRoutingModule } from './savings-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { SavingListComponent } from './saving-list/saving-list.component';


@NgModule({
  declarations: [SavingListComponent],
  imports: [
    SharedModule,
    SavingsRoutingModule
  ]
})
export class SavingsModule { }
