import { OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { BaseResourceModel } from '../../models/base-resource.model';
import { BaseResourceService } from '../../services/base-resource.service';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { ComponentType } from '@angular/cdk/portal';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

export abstract class BaseResourceList<T extends BaseResourceModel> implements OnInit {

  // resources: T[] = [];
  resources: MatTableDataSource<T>;

  @ViewChild(MatPaginator, {static: true}) paginator?: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

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
            this.resources.sort = this.sort;
          },
          error: error => this.actionsForError('erro ao carregar a lista', error)
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
        next: _ => this.actionsForSuccess('item eliminado com sucesso'),
        error: error => this.actionsForError(`erro ao deletar o item: ${resource.id}`, error)
      });
  }

  protected dialogData(resource: T) {
    return resource;
  }

  protected createResourceOnDialogMode(resource: T): void {
    this.resourceService.create(resource)
      .subscribe({
        next: _ => this.actionsForSuccess('item criado com sucesso'),
        error: error => this.actionsForError('erro ao criar item', error)
      });
  }

  protected updateResourceOnDialogMode(resource: T): void {

    this.resourceService.update(resource)
      .subscribe({
        next: _ => this.actionsForSuccess('item atualizado com sucesso'),
        error: error => this.actionsForError(`erro ao atualizar o item: ${resource.id}`, error)
      });
  }

  protected actionsForSuccess(message: string): void {
    this.snackBar.open(message, '', {
      duration: 3000,
    });
    this.ngOnInit();
  }

  protected actionsForError(message: string, error: any): void {
    this.snackBar.open(message, '', {
      duration: 3000,
    });
    console.error(error);
  }

}
