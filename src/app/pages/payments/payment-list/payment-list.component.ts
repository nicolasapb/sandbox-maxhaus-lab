import { Component } from '@angular/core';
import { BaseResourceList } from 'src/app/shared/components/base-resource-list/base-resource-list.component';
import { Payment } from '../shared/payment.model';
import { PaymentService } from '../shared/payment.service';
import { faPlus, faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-payment-list',
  templateUrl: './payment-list.component.html',
  styleUrls: ['./payment-list.component.css']
})
export class PaymentListComponent extends BaseResourceList<Payment> {

  public cols = ['recipient', 'edit', 'dueDate', 'amount', 'payDate', 'payAmount', 'auth', 'account', 'cnpj'];
  public faPlus = faPlus;
  public faTrash = faTrash;
  public faEdit = faEdit;

  constructor(protected paymentService: PaymentService) {
    super(paymentService);
  }

}
