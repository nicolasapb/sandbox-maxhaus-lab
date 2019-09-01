import { Component, Input } from '@angular/core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

export interface SingleInstallmentSavings {
  total: number;
  needs: number;
  totalPct: number;
  needsPct: number;
  target: number;
}

@Component({
  selector: 'app-single-intallment',
  templateUrl: './single-intallment.component.html',
  styleUrls: ['./single-intallment.component.css']
})
export class SingleIntallmentComponent {

  public cols = ['total', 'needs', 'totalPct', 'needsPct', 'target'];
  @Input() singleInstallment: SingleInstallmentSavings[];
  @Input() title: string;
  @Input() route: string;
  @Input() buttonText: string;

  public faPlus = faPlus;

  constructor() { }

  setColor(): string {
    return +this.singleInstallment[0].totalPct === 100 ? 'primary' : 'warn';
  }

}
