import { Injectable, Injector } from '@angular/core';
import { BaseResourceService } from 'src/app/shared/services/base-resource.service';
import { Saving } from '../../savings/shared/saving.model';
import { Simulation } from './simulation.model';

@Injectable({
  providedIn: 'root'
})
export class SimulationService extends BaseResourceService<Simulation> {

  constructor(protected injector: Injector) {
    super('api/simulations', injector, Simulation.fromJson);
  }
}
