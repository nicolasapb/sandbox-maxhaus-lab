import { Component } from '@angular/core';

import { faEdit, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { BaseResourceList } from 'src/app/shared/components/base-resource-list/base-resource-list.component';
import { Saving } from '../shared/saving.model';
import { SavingService } from '../shared/saving.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { SavingDialogComponent } from '../saving-dialog/saving-dialog.component';

export interface TotalAmount {
  type: string;
  amount: number;
}

@Component({
  selector: 'app-saving-list',
  templateUrl: './saving-list.component.html',
  styleUrls: ['./saving-list.component.css']
})
export class SavingListComponent extends BaseResourceList<Saving> {

  public cols = ['type', 'simulation', 'edit', 'date', 'amount'];
  public faPlus = faPlus;
  public faTrash = faTrash;
  public faEdit = faEdit;
  public realTotalByType: TotalAmount[] = [];
  public prevTotalByType: TotalAmount[] = [];
  public realTotal: number;
  public prevTotal: number;

  constructor(
    protected savingService: SavingService,
    protected snackBar: MatSnackBar,
    protected dialog: MatDialog) {
    super(savingService, snackBar, dialog, SavingDialogComponent, Saving.fromJson);
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

  protected onInitSubscribe(): void {
    this.buildRealTotal();
    this.buildPrevTotal();
  }

  protected buildRealTotal(): void {
    this.realTotalByType = [];
    this.realTotal = 0;
    this.sumByTypeAndSimulationValue(this.realTotalByType, false);
    this.realTotal = this.realTotalByType.reduce( (val, entry) => val + +entry.amount, 0 );
  }

  protected buildPrevTotal(): void {
    this.prevTotalByType = [];
    this.sumByTypeAndSimulationValue(this.prevTotalByType, true);
    this.prevTotal = this.prevTotalByType.reduce( (val, entry) => val + +entry.amount, 0 );
  }

  protected sumByTypeAndSimulationValue(totalByType: Array<TotalAmount>, simValue: boolean) {
    const sum = {};

    this.resources.data.filter(resource => resource.simulation === simValue)
      .map(resource => {
        return { type: this.getTypeText(resource.type), amount: +resource.amount };
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
