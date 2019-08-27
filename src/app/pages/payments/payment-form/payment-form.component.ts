import { Component, Injector } from '@angular/core';
import { BaseResourceFormComponent } from 'src/app/shared/components/base-resource-forms/base-resource-forms.component';
import { Payment } from '../shared/payment.model';
import { PaymentService } from '../shared/payment.service';
import { Validators } from '@angular/forms';
import { faAngleDoubleLeft, faSave } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-payment-form',
  templateUrl: './payment-form.component.html',
  styleUrls: ['./payment-form.component.css']
})
export class PaymentFormComponent extends BaseResourceFormComponent<Payment> {

  public faAngleDoubleLeft = faAngleDoubleLeft;
  public faSave = faSave;

  constructor(
    protected paymentService: PaymentService,
    protected injector: Injector
  ) {
    super(injector, new Payment(), paymentService, Payment.fromJson);
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
