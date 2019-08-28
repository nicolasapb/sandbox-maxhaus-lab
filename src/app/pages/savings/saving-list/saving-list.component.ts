import { Component, OnInit } from '@angular/core';

import { faEdit, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { BaseResourceList } from 'src/app/shared/components/base-resource-list/base-resource-list.component';
import { Saving } from '../shared/saving.model';
import { SavingService } from '../shared/saving.service';

@Component({
  selector: 'app-saving-list',
  templateUrl: './saving-list.component.html',
  styleUrls: ['./saving-list.component.css']
})
export class SavingListComponent extends BaseResourceList<Saving> {

  public cols = ['type', 'edit', 'amount'];
  public faPlus = faPlus;
  public faTrash = faTrash;
  public faEdit = faEdit;

  constructor(protected savingService: SavingService) {
    super(savingService);
   }

}
