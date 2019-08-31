import { OnInit, AfterContentChecked, Injector } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

import { BaseResourceModel } from '../../models/base-resource.model';

export abstract class BaseResourceDialogComponent<T extends BaseResourceModel> implements OnInit, AfterContentChecked {

    public currentAction: string;
    public resourceForm: FormGroup;
    public pageTitle: string;
    public imaskAmountConfig = {
      mask: Number,
      scale: 2,
      thousandsSeparator: '.',
      padFractionalZeros: true,
      normalizeZeros: true,
      radix: ','
    };
    public imaskPercentConfig = {
      mask: Number,
      scale: 2,
      thousandsSeparator: '.',
      padFractionalZeros: false,
      normalizeZeros: true,
      radix: ',',
      min: 0,
      max: 101
    };
    public imaskIntegerConfig = {
      mask: Number,
      scale: 0,
      thousandsSeparator: '.',
      padFractionalZeros: false,
      normalizeZeros: true,
      radix: ',',
      min: 0,
      max: 101
    };

    protected formBuilder: FormBuilder;

    constructor(
      protected injector: Injector,
      protected dialogRef: MatDialogRef<any>,
      protected resource?: T
    ) {
      this.formBuilder = this.injector.get(FormBuilder);
    }

    ngOnInit() {
      this.setCurrentaction();
      this.buildResourceForm();
      this.loadResource();
    }

    ngAfterContentChecked(): void {
      this.setPageTitle();
    }

    submitForm() {
      this.onSave();
    }

    onNoClick(): void {
      this.dialogRef.close();
    }

    // PROTECTED METHODS
    protected loadResource(): void {
      if (this.currentAction === 'edit') {
        this.resourceForm.patchValue(this.resource);
      }
    }

    protected onSave(): void {
      const resourceFormValue: T = this.resourceForm.value;
      this.dialogRef.close(resourceFormValue);
    }

    protected setCurrentaction(): void {
      this.resource ? this.currentAction = 'edit' : this.currentAction = 'new';
    }

    protected setPageTitle(): void {
      if (this.currentAction === 'new') {
        this.pageTitle = this.creationPageTitle();
      } else {
        this.pageTitle = this.editionPageTitle();
      }
    }

    protected creationPageTitle(): string {
      return 'Novo';
    }

    protected editionPageTitle(): string {
      return 'Edição';
    }

    protected abstract buildResourceForm(): void;

  }
