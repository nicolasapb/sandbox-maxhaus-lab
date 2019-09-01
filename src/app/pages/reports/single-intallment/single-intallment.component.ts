import { Component, Input } from '@angular/core';

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

  constructor() { }

  setColor(): string {
    return +this.singleInstallment[0].totalPct === 100 ? 'primary' : 'warn';
  }

}
