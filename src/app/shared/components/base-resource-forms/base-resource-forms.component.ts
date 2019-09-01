import { OnInit, AfterContentChecked, Injector } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { BaseResourceModel } from '../../models/base-resource.model';
import { BaseResourceService } from '../../services/base-resource.service';

import { switchMap } from 'rxjs/operators';

export abstract class BaseResourceFormComponent<T extends BaseResourceModel> implements OnInit, AfterContentChecked {

  public currencAction: string;
  public resourceForm: FormGroup;
  public pageTitle: string;
  public serverErrorMessages: string[] = null;
  public submittingForm = false;
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

  protected route: ActivatedRoute;
  protected router: Router;
  protected formBuilder: FormBuilder;
  protected snackBar: MatSnackBar;

  constructor(
    protected injector: Injector,
    public resource: T,
    protected resourceService: BaseResourceService<T>,
    protected jsonDataToResourceFn: (jsonData: any) => T
  ) {
      this.route = this.injector.get(ActivatedRoute);
      this.router = this.injector.get(Router);
      this.formBuilder = this.injector.get(FormBuilder);
      this.snackBar = this.injector.get(MatSnackBar);
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
    this.submittingForm = true;

    if (this.currencAction === 'new') {
      this.createResource();
    } else {
      this.updateResource();
    }
  }

  // PROTECTED METHODS

  protected setCurrentaction(): void {
    this.route.snapshot.url[0].path === 'new' ? this.currencAction = 'new' : this.currencAction = 'edit';
  }

  protected loadResource(): void {
    if (this.currencAction === 'edit') {
      this.route.paramMap
        .pipe(
          switchMap(params => this.resourceService.getById(+params.get('id')))
        )
        .subscribe({
          next: resource => {
            this.resource = resource;
            this.resourceForm.patchValue(this.resource);
          },
          error: _ => alert('Ocorreu um erro no servidor')
        });
    }
  }

  protected setPageTitle(): void {
    if (this.currencAction === 'new') {
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

  protected createResource(): void {
    const resource: T = this.jsonDataToResourceFn(this.resourceForm.value);
    this.resourceService.create(resource)
      .subscribe({
        next: newResource => this.actionsForSuccess(newResource),
        error: error => this.actionsForError(error)
      });
  }

  protected updateResource(): void {
    const resource: T = this.jsonDataToResourceFn(this.resourceForm.value);

    this.resourceService.update(resource)
      .subscribe({
        next: newResource => this.actionsForSuccess(newResource),
        error: error => this.actionsForError(error)
      });
  }

  protected actionsForSuccess(resource: T): void {
    this.snackBar.open('Solicitação processada com sucesso', 'OK', {
      duration: 2000,
    });
    const baseComponentPath: string = this.route.snapshot.parent.url[0].path;

    this.router.navigateByUrl(baseComponentPath, {skipLocationChange: true})
      .then(
        () => this.router.navigate([baseComponentPath, resource.id, 'edit'])
      );
  }

  protected actionsForError(error: any): void {
    this.snackBar.open('Ocorreu um erro ao processar a sua solicitação', 'OK', {
      duration: 2000,
    });

    this.submittingForm = false;

    if (error.stauts === 422) {
      this.serverErrorMessages = JSON.parse(error._body).errors;
    } else {
      this.serverErrorMessages = ['Falha na comunicação com o servidor. Por favor, tente  mais tarde'];
    }
  }

  protected abstract buildResourceForm(): void;

}
