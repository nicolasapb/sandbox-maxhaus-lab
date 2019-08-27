import { NgModule } from '@angular/core';

import { SharedModule } from 'src/app/shared/shared.module';
import { PaymentsRoutingModule } from './payments-routing.module';
import { PaymentListComponent } from './payment-list/payment-list.component';
import { PaymentFormComponent } from './payment-form/payment-form.component';


@NgModule({
  declarations: [PaymentListComponent, PaymentFormComponent],
  imports: [
    SharedModule,
    PaymentsRoutingModule,
  ]
})
export class PaymentsModule { }
