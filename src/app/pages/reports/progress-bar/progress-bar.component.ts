import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.css']
})
export class ProgressBarComponent {

  @Input() entryValue: number;
  @Input() singleValue: number;
  @Input() monthlyValue: number;

  constructor() { }

  setColor(value: number): string {
    return +value === 100 ? 'primary' : 'warn';
  }

}
