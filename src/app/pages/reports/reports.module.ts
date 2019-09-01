import { NgModule } from '@angular/core';

import { SharedModule } from 'src/app/shared/shared.module';
import { ReportsRoutingModule } from './reports-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';
import { SummaryComponent } from './summary/summary.component';
import { SingleIntallmentComponent } from './single-intallment/single-intallment.component';
import { EconomiesChartComponent } from './economies-chart/economies-chart.component';


@NgModule({
  declarations: [DashboardComponent, ProgressBarComponent, SummaryComponent, SingleIntallmentComponent, EconomiesChartComponent],
  imports: [
    SharedModule,
    ReportsRoutingModule
  ]
})
export class ReportsModule { }
