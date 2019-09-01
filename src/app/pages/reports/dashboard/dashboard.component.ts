import { Component, OnInit } from '@angular/core';
import { PaymentService } from '../../payments/shared/payment.service';
import { Payment } from '../../payments/shared/payment.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SingleInstallmentSavings } from '../single-intallment/single-intallment.component';
import { SavingService } from '../../savings/shared/saving.service';
import { Saving } from '../../savings/shared/saving.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public entryValue: number;
  public singleValue: number;
  public monthlyValue: number;

  public entryContract = 60000;
  public singleContract = 25500;
  public monthlyContract = 32500;

  public payments: Payment[];
  public savings: Saving[];
  public singleInstallment: SingleInstallmentSavings[] = [];
  public monthlyInstallment: SingleInstallmentSavings[] = [];

  constructor(
    protected snackBar: MatSnackBar,
    protected paymentService: PaymentService,
    protected savingService: SavingService
  ) { }

  ngOnInit() {
    this.getPayments();
    this.getSavings();
  }

  protected getPayments(): void {
    this.paymentService.getAll().subscribe({
      next: payments => this.processAfterPaymentServiceReturns(payments),
      error: error => this.handleError(error)
    });
  }

  protected getSavings(): void {
    this.savingService.getAll().subscribe({
      next: savings => this.processAfterSavingsServiceReturns(savings),
      error: error => this.handleError(error)
    });
  }

  protected processAfterPaymentServiceReturns(payments: Payment[]): void {
    this.payments = payments;
    this.entryValue = this.calculatePaymentPct('0', this.entryContract);
    this.monthlyValue = this.calculatePaymentPct('1', this.monthlyContract);
    this.singleValue = this.calculatePaymentPct('2', this.singleContract);

    const target = 32500.00;
    let total = 0;
    total = payments.filter( payment => payment.type === '1' )
      .reduce( (sum, payment) => sum + payment.amount, 0);
    const needs = (target - total) < 0 ? 0 : target - total ;
    const needsPct = this.monthlyValue;
    const totalPct = 100 - needsPct;

    this.monthlyInstallment.push({
      total,
      target,
      needs,
      needsPct,
      totalPct
    });
  }

  protected calculatePaymentPct(type: string, contractValue: number): number {
    const entryAmount = this.payments.filter( payment => payment.type === type)
      .reduce( (total, payment) => total + payment.amount, 0);

    let value = entryAmount / contractValue;

    if (value > 1) {
      value = 1;
    }

    return value = value * 100;
  }

  protected processAfterSavingsServiceReturns(savings: Saving[]): void {
    this.savings = savings;

    const target = 25500.00;
    const total = this.savings.filter( saving => saving.type === 'PP' && saving.simulation === false )
      .reduce( (sum, saving) => sum + saving.amount, 0);
    const needs = (target - total) < 0 ? 0 : target - total ;
    const needsPct = (needs / total) * 100;
    const totalPct = 100 - needsPct;

    this.singleInstallment.push({
      total,
      target,
      needs,
      needsPct,
      totalPct
    });

  }

  protected handleError(error: any): void {
    this.snackBar.open('Alguma coisa deu errado', '', {
      duration: 3000,
    });
    console.error(error);
  }

}
