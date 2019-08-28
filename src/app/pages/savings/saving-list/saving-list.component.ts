import { Component } from '@angular/core';

import { faEdit, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { BaseResourceList } from 'src/app/shared/components/base-resource-list/base-resource-list.component';
import { Saving } from '../shared/saving.model';
import { SavingService } from '../shared/saving.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { SavingDialogComponent } from '../saving-dialog/saving-dialog.component';

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

}
