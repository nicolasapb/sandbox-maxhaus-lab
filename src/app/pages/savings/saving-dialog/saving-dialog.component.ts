import { Component, OnInit, Injector, Inject } from '@angular/core';
import { BaseResourceDialogComponent } from 'src/app/shared/components/base-resource-dialog/base-resource-dialog.component';
import { Saving } from '../shared/saving.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Payment } from '../../payments/shared/payment.model';
import { Validators } from '@angular/forms';
import { faSave } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-saving-dialog',
  templateUrl: './saving-dialog.component.html',
  styleUrls: ['./saving-dialog.component.css']
})
export class SavingDialogComponent extends BaseResourceDialogComponent<Saving> implements OnInit {

  public types = [];
  public faSave = faSave;

  constructor(
    protected injector: Injector,
    protected dialogRef: MatDialogRef<SavingDialogComponent>,
    @Inject(MAT_DIALOG_DATA) protected saving: Saving
    ) {
      super(injector, dialogRef, saving);
    }

  ngOnInit(): void {
    super.ngOnInit();
    this.types = this.typeOptions;
  }

  get typeOptions(): Array<any> {
    return Object.entries(Payment.types)
      .map(([value, text]) => {
        return { text, value };
      });
  }

  protected buildResourceForm(): void {
    this.resourceForm = this.formBuilder.group({});
  }

  protected creationPageTitle(): string {
    return 'Cadastro de novo Pagamento';
  }

  protected editionPageTitle(): string {
    const resourceId = this.resource.id || '...';
    return `Editando o Pagamento ${resourceId}`;
  }

}
