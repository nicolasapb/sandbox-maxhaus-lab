import { OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { BaseResourceModel } from '../../models/base-resource.model';
import { BaseResourceService } from '../../services/base-resource.service';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { ComponentType } from '@angular/cdk/portal';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

export abstract class BaseResourceList<T extends BaseResourceModel> implements OnInit {

  // resources: T[] = [];
  resources: MatTableDataSource<T>;

  @ViewChild(MatPaginator, {static: true}) paginator?: MatPaginator;
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
          next: resources => {
            this.resources = new MatTableDataSource<T>(resources);
            this.resources.paginator = this.paginator;
          },
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

      if (this.resources.data.find( found => resourceFormValue.id === found.id )) {
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
        next: _ =>{
          const filter = this.resources.data.filter(element => element !== resource );
          this.resources = new MatTableDataSource<T>(filter);
        },
        error: error => this.handleServiceError(`erro ao deletar o item: ${resource.id}`, error)
      });
  }

  protected dialogData(resource: T) {
    return resource;
  }

  protected createResourceOnDialogMode(resource: T): void {
    this.resourceService.create(resource)
      .subscribe({
        next: _ => this.actionsForSuccess(),
        error: error => this.actionsForError(error)
      });
  }

  protected updateResourceOnDialogMode(resource: T): void {

    this.resourceService.update(resource)
      .subscribe({
        next: _ => this.actionsForSuccess(),
        error: error => this.actionsForError(error)
      });
  }

  protected actionsForSuccess(): void {
    this.snackBar.open('Solicitação processada com sucesso', 'OK', {
      duration: 2000,
    });
    this.ngOnInit();
  }

  protected actionsForError(error: any): void {
    this.snackBar.open('Ocorreu um erro ao processar a sua solicitação', 'OK', {
      duration: 2000,
    });
    console.error(error);
  }

  protected handleServiceError(operation: string, error: any): void {
    alert(operation);
    console.log(error);
  }

}
