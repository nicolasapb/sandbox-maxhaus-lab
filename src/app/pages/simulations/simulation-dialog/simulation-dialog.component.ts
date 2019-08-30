import { Component, OnInit, Injector, Inject } from '@angular/core';
import { BaseResourceDialogComponent } from 'src/app/shared/components/base-resource-dialog/base-resource-dialog.component';
import { Simulation } from '../shared/simulation.model';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-simulation-dialog',
  templateUrl: './simulation-dialog.component.html',
  styleUrls: ['./simulation-dialog.component.css']
})
export class SimulationDialogComponent extends BaseResourceDialogComponent<Simulation> {


  public faSave = faSave;

  constructor(
    protected injector: Injector,
    protected dialogRef: MatDialogRef<SimulationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) protected simulation: Simulation
    ) {
      super(injector, dialogRef, simulation);
    }

  close(): void {
    this.onNoClick();
  }

  protected buildResourceForm(): void {
    this.resourceForm = this.formBuilder.group({
      id: [null],
      composition: [{value: null, disabled: true}, [Validators.required]],
      total: [{value: null, disabled: true}, [Validators.required]],
      entry: [{value: null, disabled: true}, [Validators.required]],
      entryPct: [{value: null, disabled: true}, [Validators.required]],
      funding: [{value: null, disabled: true}, [Validators.required]],
      fundingPct: [{value: null, disabled: true}, [Validators.required]],
      renovation: [{value: null, disabled: true}, [Validators.required]],
      installment: [null, [Validators.required]],
      fundFees: [null, [Validators.required]],
      composeIncome: [null, [Validators.required]],
      interest: [null, [Validators.required]],
      term: [null, [Validators.required]],
      simDate: [new Date(), [Validators.required]]
   });
  }

  protected creationPageTitle(): string {
    return 'Cadastro de nova simulação';
  }

  protected editionPageTitle(): string {
    const resourceId = this.resource.id || '...';
    if (this.resource.id) {
      return `Editando a simulação ${resourceId}`;
    } else {
      return 'Cadastro de nova simulação';
    }
  }

}
