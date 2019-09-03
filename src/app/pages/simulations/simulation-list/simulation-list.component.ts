import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { BaseResourceList } from 'src/app/shared/components/base-resource-list/base-resource-list.component';
import { faTrash, faEdit, faPlus } from '@fortawesome/free-solid-svg-icons';
import { SavingService } from '../../savings/shared/saving.service';
import { SimulationService } from '../shared/simulation.service';
import { Simulation } from '../shared/simulation.model';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Saving } from '../../savings/shared/saving.model';
import { MatListOption } from '@angular/material/list';
import { SimulationFormComponent } from '../simulation-form/simulation-form.component';
import { MatDialog } from '@angular/material/dialog';
import { SimulationDialogComponent } from '../simulation-dialog/simulation-dialog.component';

export interface TotalAmount {
  type: string;
  amount: number;
}
@Component({
  selector: 'app-simulation-list',
  templateUrl: './simulation-list.component.html',
  styleUrls: ['./simulation-list.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class SimulationListComponent extends BaseResourceList<Simulation> implements OnInit {

  public cols = [
    'composition', 'edit', 'total', 'entry', 'entryPct', 'funding',
    'fundingPct', 'renovation', 'installment', 'fundFees', 'composeIncome', // 'interest', 'term', 'simDate'
  ];
  public faTrash = faTrash;
  public faEdit = faEdit;
  public faPlus = faPlus;
  public savings: Saving[];
  public prevTotalByType: TotalAmount[] = [];
  public prevTotal: number;
  public totalCompostion: number;
  public compostion: string;
  public simulation: Simulation;
  public contractValue = 510381.00;
  public contractEntry = 118000.00;
  // public showForm = false;

  constructor(
    // protected formComponent: SimulationFormComponent,
    protected simulationService: SimulationService,
    protected savingService: SavingService,
    protected snackBar: MatSnackBar,
    protected dialog: MatDialog) {
    super(simulationService, snackBar, dialog, SimulationDialogComponent, Simulation.fromJson);
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.getSavingsPrevision();
  }

  onSelection(selectedValues: Array<MatListOption>) {
    this.totalCompostion = 0;
    this.compostion = '';
    selectedValues.forEach( selection => {
      this.compostion = this.compostion.concat( this.compostion === '' ? '' : ' + ', selection.value.type);
      this.totalCompostion += +selection.value.amount;
    });
  }

  get typeOptions(): Array<any> {
    return Object.entries(Saving.types)
      .map(([value, text]) => {
        return { text, value };
      });
  }

  getTypeText(type: string): string {
    const found = this.typeOptions.find( check => check.value === type);
    return found.text;
  }

  newSimulation(): void {
    const entry = this.totalCompostion + this.contractEntry;
    const entryPct = (entry / this.contractValue) * 100;
    const funding = this.contractValue - entry;
    const fundingPct = 100 - entryPct;
    const renovation = this.prevTotal - this.totalCompostion;
    this.simulation = new Simulation(
      null, this.compostion, this.totalCompostion, entry, entryPct,
      funding, fundingPct, renovation, null, false, true, null, null, null, null, null, new Date()
      );
    this.openDialog(this.simulation);
    // this.showForm = true;
  }

  protected getSavingsPrevision(): void {

    // due to backend limitations, all records are retrieved and then filtered
    this.savingService.getAll().subscribe({
      next: savings => {
        this.savings = savings;
        this.buildPrevTotal();
      },
      error: error => this.actionsForError('erro ao recuperar as economias', error)
    });
  }

  protected buildPrevTotal(): void {
    this.prevTotalByType = [];
    this.sumByTypeAndSimulationValue(this.prevTotalByType, true);
    this.prevTotal = this.prevTotalByType.reduce( (val, entry) => val + +entry.amount, 0 );
  }

  protected sumByTypeAndSimulationValue(totalByType: Array<TotalAmount>, simValue: boolean) {
    const sum = {};

    this.savings.filter(saving => saving.simulation === simValue)
      .map(saving => {
        return { type: this.getTypeText(saving.type), amount: +saving.amount };
      })
      .forEach(entry => {
        if (!sum[entry.type]) {
          sum[entry.type] = 0;
        }
        sum[entry.type] += +entry.amount;
      });

    Object.keys(sum).forEach(key => {
      if (sum.hasOwnProperty(key)) {
        totalByType.push({type: key, amount: sum[key]});
      }
    });

  }

}
