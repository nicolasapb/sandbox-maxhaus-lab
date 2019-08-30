import { Component, OnInit, Inject, Injector } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Payment } from '../shared/payment.model';
import { BaseResourceDialogComponent } from 'src/app/shared/components/base-resource-dialog/base-resource-dialog.component';
import { Validators } from '@angular/forms';
import { faSave } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-payment-dialog',
  templateUrl: './payment-dialog.component.html',
  styleUrls: ['./payment-dialog.component.css']
})
export class PaymentDialogComponent extends BaseResourceDialogComponent<Payment> implements OnInit {

  public types = [];
  public faSave = faSave;

  constructor(
    protected injector: Injector,
    protected dialogRef: MatDialogRef<PaymentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) protected payment: Payment) {
    super(injector, dialogRef, payment);
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.types = this.typeOptions;
  }

  close(): void {
    this.onNoClick();
  }

  get typeOptions(): Array<any> {
    return Object.entries(Payment.types)
      .map(([value, text]) => {
        return { text, value };
      });
  }

  protected buildResourceForm(): void {
    this.resourceForm = this.formBuilder.group({
      id: [null],
      recipient: [null, [Validators.required, Validators.minLength(2)]],
      dueDate: [null, [Validators.required]],
      amount: [null, [Validators.required]],
      payDate: [null, [Validators.required]],
      payAmount: [null, [Validators.required]],
      auth: [null, [Validators.required, Validators.minLength(22), Validators.maxLength(25)]],
      account: [null, [Validators.required, Validators.minLength(14), Validators.maxLength(15)]],
      cnpj: [null, [Validators.required, Validators.minLength(14), Validators.maxLength(18)]],
      paid: [true, [Validators.required]],
      type: ['1', [Validators.required]]
    });
  }

  protected creationPageTitle(): string {
    return 'Cadastro de novo Pagamento';
  }

  protected editionPageTitle(): string {
    const resourceId = this.resource.id || '...';
    return `Editando o Pagamento ${resourceId}`;
  }

}
