import { Component, OnInit } from '@angular/core';
import { ChartType, ChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';
import { SavingService } from '../../savings/shared/saving.service';
import { Saving } from '../../savings/shared/saving.model';

export interface TotalAmount {
  type: string;
  amount: number;
}

@Component({
  selector: 'app-economies-chart',
  templateUrl: './economies-chart.component.html',
  styleUrls: ['./economies-chart.component.css']
})
export class EconomiesChartComponent implements OnInit {

    // Pie
  public pieChartOptions: ChartOptions = {
    responsive: true,
    aspectRatio: 2,
    legend: {
      position: 'top',
    },
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          const label = ctx.chart.data.labels[ctx.dataIndex];
          return label;
        },
      },
    }
  };
  public pieChartLabels: Label[] = [];
  public pieChartData: number[] = [];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartColors = [
    {
      backgroundColor: [
        'rgba(219, 84, 97,0.85)',
        'rgba(255, 217, 206,0.85)',
        'rgba(89, 60, 143,0.85)',
        'rgba(42, 249, 243,0.85)',
        'rgba(23, 23, 56,0.85)',
        'rgba(173, 188, 165,0.85)',
        'rgba(203, 118, 158,0.85)'
      ],
    },
  ];
  constructor(
    protected savingService: SavingService
    ) { }


  ngOnInit() {
    this.savingService.getAll().subscribe({
      next: savings => {
        const sum = {};

        savings.filter( saving => !saving.simulation )
        .map(saving => {
          return { type: this.getTypeText(saving.type), amount: +saving.amount };
        })
        .forEach(entry => {
          if (!sum[entry.type]) {
            sum[entry.type] = 0;
          }
          sum[entry.type] += +entry.amount;
        });

        Object.keys(sum).forEach(key => {
          if (sum.hasOwnProperty(key)) {
            this.pieChartLabels.push(key);
            this.pieChartData.push(sum[key]);
            // this.pieChartColors[0].backgroundColor.push(this.dynamicColors());
          }
        });
      }
    });
  }

   get typeOptions(): Array<any> {
    return Object.entries(Saving.types)
      .map(([value, text]) => {
        return { text, value };
      });
  }

  getTypeText(type: string): string {
    const found = this.typeOptions.find( check => check.value === type);
    return found.text;
  }

  dynamicColors(): string {
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);
    return `rgba(${r},${g},${b},0.65)`;
 }


}
