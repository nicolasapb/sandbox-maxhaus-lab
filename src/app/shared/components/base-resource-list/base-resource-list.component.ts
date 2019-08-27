import { OnInit } from '@angular/core';

import { BaseResourceModel } from '../../models/base-resource.model';
import { BaseResourceService } from '../../services/base-resource.service';

export abstract class BaseResourceList<T extends BaseResourceModel> implements OnInit {

  resources: T[] = [];

  constructor(
      protected resourceService: BaseResourceService<T>
    ) { }

  ngOnInit() {
    this.resourceService.getAll()
      .subscribe({
          next: resources => this.resources = resources,
          error: error => this.handleServiceError('erro ao carregar a lista', error)
      });
  }

  deleteResource(resource: T): void {
    this.resourceService.delete(resource.id)
      .subscribe({
        next: _ => this.resources = this.resources.filter(element => element !== resource ),
        error: error => this.handleServiceError(`erro ao deletar o item: ${resource.id}`, error)
      });
  }

  protected handleServiceError(operation: string, error: any): void {
    alert(operation);
    console.log(error);
  }

}
