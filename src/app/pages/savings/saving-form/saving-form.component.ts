import { Component, OnInit, Injector } from '@angular/core';
import { Validators } from '@angular/forms';

import { BaseResourceFormComponent } from 'src/app/shared/components/base-resource-forms/base-resource-forms.component';
import { Saving } from '../shared/saving.model';
import { SavingService } from '../shared/saving.service';
import { faSave, faAngleDoubleLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-saving-form',
  templateUrl: './saving-form.component.html',
  styleUrls: ['./saving-form.component.css']
})
export class SavingFormComponent extends BaseResourceFormComponent<Saving> implements OnInit {

  public types = [];
  public faSave = faSave;
  public faAngleDoubleLeft = faAngleDoubleLeft;

  constructor(
    protected injector: Injector,
    protected savingService: SavingService
  ) {
    super(injector, new Saving(), savingService, Saving.fromJson);
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.types = this.typeOptions;
  }


  get typeOptions(): Array<any> {
    return Object.entries(Saving.types)
      .map(([value, text]) => {
        return { text, value };
      });
  }

  protected buildResourceForm(): void {
    this.resourceForm = this.formBuilder.group({
      id: [null],
      type: ['PP', [Validators.required]],
      amount: [null, [Validators.required]],
      date: [null, [Validators.required]],
      simulation: [false, [Validators.required]]
   });
  }

  protected creationPageTitle(): string {
    return 'Cadastro de nova Economia';
  }

  protected editionPageTitle(): string {
    const resourceId = this.resource.id || '...';
    return `Editando a economia ${resourceId}`;
  }
}
