import { OnInit, TemplateRef } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { BaseResourceModel } from '../../models/base-resource.model';
import { BaseResourceService } from '../../services/base-resource.service';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { ComponentType } from '@angular/cdk/portal';

export abstract class BaseResourceList<T extends BaseResourceModel> implements OnInit {

  resources: T[] = [];

  constructor(
      protected resourceService: BaseResourceService<T>,
      protected snackBar?: MatSnackBar,
      protected dialog?: MatDialog,
      protected componentOrTemplateRef?: any, // any??
      protected jsonDataToResourceFn?: (jsonData: any) => T
    ) { }

  ngOnInit() {
    this.resourceService.getAll()
      .subscribe({
          next: resources => this.resources = resources,
          error: error => this.handleServiceError('erro ao carregar a lista', error)
      });
  }

  openDialog(resource?: T): void {
    const dialogConfig = new MatDialogConfig();

    // dialogConfig.disableClose = true;
    dialogConfig.autoFocus = false;

    if (resource) {
      dialogConfig.data = this.dialogData(resource);
    }

    const dialogRef = this.dialog.open(this.componentOrTemplateRef, dialogConfig);

    dialogRef.afterClosed().subscribe(resourceFormValue => {
      if (!resourceFormValue) { return; }

      if (this.resources.find( found => resourceFormValue.id === found.id )) {
        const modifiedResource: T = this.jsonDataToResourceFn(resourceFormValue);
        this.updateResourceOnDialogMode(modifiedResource);
      } else {
        const newResource: T = this.jsonDataToResourceFn(resourceFormValue);
        this.createResourceOnDialogMode(newResource);
      }

    });
  }

  deleteResource(resource: T): void {
    this.resourceService.delete(resource.id)
      .subscribe({
        next: _ => this.resources = this.resources.filter(element => element !== resource ),
        error: error => this.handleServiceError(`erro ao deletar o item: ${resource.id}`, error)
      });
  }

  protected dialogData(resource: T) {
    return resource;
  }

  protected createResourceOnDialogMode(resource: T): void {
    this.resourceService.create(resource)
      .subscribe({
        next: newResource => {
          this.resources.push(newResource);
          this.actionsForSuccess();
        },
        error: error => this.actionsForError(error)
      });
  }

  protected updateResourceOnDialogMode(resource: T): void {

    this.resourceService.update(resource)
      .subscribe({
        next: newResource => {
          // atualizar o item da lista
          this.actionsForSuccess();
        },
        error: error => this.actionsForError(error)
      });
  }

  protected actionsForSuccess(): void {
    this.snackBar.open('Solicitação processada com sucesso', 'OK', {
      duration: 2000,
    });
  }

  protected actionsForError(error: any): void {
    this.snackBar.open('Ocorreu um erro ao processar a sua solicitação', 'OK', {
      duration: 2000,
    });
  }

  protected handleServiceError(operation: string, error: any): void {
    alert(operation);
    console.log(error);
  }

}
