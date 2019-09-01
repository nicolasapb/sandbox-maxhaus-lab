import { NgModule } from '@angular/core';

import { SavingsRoutingModule } from './savings-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { SavingListComponent } from './saving-list/saving-list.component';
import { SavingDialogComponent } from './saving-dialog/saving-dialog.component';
import { SavingFormComponent } from './saving-form/saving-form.component';


@NgModule({
  declarations: [SavingListComponent, SavingDialogComponent, SavingFormComponent],
  imports: [
    SharedModule,
    SavingsRoutingModule
  ],
  entryComponents: [SavingDialogComponent]
})
export class SavingsModule { }
