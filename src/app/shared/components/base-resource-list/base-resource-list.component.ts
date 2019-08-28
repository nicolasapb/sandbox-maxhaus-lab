import { OnInit, TemplateRef, ViewChild, AfterViewInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { BaseResourceModel } from '../../models/base-resource.model';
import { BaseResourceService } from '../../services/base-resource.service';

export abstract class BaseResourceList<T extends BaseResourceModel> implements OnInit, AfterViewInit {

  // resources: T[] = [];
  resources: MatTableDataSource<T> = new MatTableDataSource<T>();

  @ViewChild(MatPaginator, {static: false}) paginator?: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort?: MatSort;

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
            this.resources.data = resources;
            this.resources.paginator = this.paginator;
            this.resources.sort = this.sort;
          },
          error: error => this.actionsForError('erro ao carregar a lista', error)
      });
  }

  ngAfterViewInit(): void {
    // If the user changes the sort order, reset back to the first page.
    if (this.sort) {
      this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    }
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
