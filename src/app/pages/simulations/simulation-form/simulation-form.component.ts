import { Component, Injector, Input, Inject } from '@angular/core';
import { Simulation } from '../shared/simulation.model';
import { BaseResourceFormComponent } from 'src/app/shared/components/base-resource-forms/base-resource-forms.component';
import { SimulationService } from '../shared/simulation.service';
import { faSave } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-simulation-form',
  templateUrl: './simulation-form.component.html',
  styleUrls: ['./simulation-form.component.css']
})
export class SimulationFormComponent extends BaseResourceFormComponent<Simulation> {

  @Input() simulation: Simulation;
  @Input() showForm: boolean;
  public faSave = faSave;

  constructor(
    protected simulationService: SimulationService,
    protected injector: Injector
  ) {
    super(injector, new Simulation(), simulationService, Simulation.fromJson);
  }

  close(): void {
    // this.resourceForm.reset();
    this.showForm = false;
  }

  refresh(): void {
    this.ngOnInit();
  }

  protected buildResourceForm(): void {

  }

  protected creationPageTitle(): string {
    return 'Cadastro de nova simulação';
  }

  protected editionPageTitle(): string {
    const resourceId = this.resource.id || '...';
    return `Editando a simulação ${resourceId}`;
  }


  protected setCurrentaction(): void {
    console.log('setCurrentaction', this.simulation);
    this.simulation ? this.currencAction = 'edit' : this.currencAction = 'new';
  }

  protected loadResource(): void {
    // console.log('loadResource', this.simulation);
    // if (this.currencAction === 'edit') {
      this.resource = this.simulation;
      // this.resourceForm.patchValue(this.resource);
    // }
  }
}
