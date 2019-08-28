import { Injectable, Injector } from '@angular/core';
import { BaseResourceService } from 'src/app/shared/services/base-resource.service';
import { Saving } from './saving.model';

@Injectable({
  providedIn: 'root'
})
export class SavingService extends BaseResourceService<Saving> {

  constructor(protected injector: Injector) {
    super('api/savings', injector, Saving.fromJson);
  }
}
