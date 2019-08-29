import { Component, Injector, Input } from '@angular/core';
import { Simulation } from '../shared/simulation.model';
import { BaseResourceFormComponent } from 'src/app/shared/components/base-resource-forms/base-resource-forms.component';
import { SimulationService } from '../shared/simulation.service';

@Component({
  selector: 'app-simulation-form',
  templateUrl: './simulation-form.component.html',
  styleUrls: ['./simulation-form.component.css']
})
export class SimulationFormComponent extends BaseResourceFormComponent<Simulation> {

  @Input() simulation: Simulation;
  constructor(
    protected simulationService: SimulationService,
    protected injector: Injector
  ) {
    super(injector, new Simulation(), simulationService, Simulation.fromJson);
  }

  protected buildResourceForm(): void {

  }


  protected setCurrentaction(): void {
    this.simulation ? this.currencAction = 'edit' : this.currencAction = 'new';
  }

  protected loadResource(): void {
    if (this.currencAction === 'edit') {
      this.resource = this.simulation;
      this.resourceForm.patchValue(this.resource);
    }
  }
}
