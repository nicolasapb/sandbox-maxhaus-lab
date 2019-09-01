import { Component, OnInit } from '@angular/core';
import { PaymentService } from '../../payments/shared/payment.service';
import { Payment } from '../../payments/shared/payment.model';
import { MatSnackBar } from '@angular/material/snack-bar';

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

  constructor(
    protected snackBar: MatSnackBar,
    protected paymentService: PaymentService
  ) { }

  ngOnInit() {
    this.getPayments();
  }

  protected getPayments(): void {
    this.paymentService.getAll().subscribe({
      next: payments => this.processAfterPaymentServiceReturns(payments),
      error: error => this.handleError(error)
    });
  }

  protected processAfterPaymentServiceReturns(payments: Payment[]): void {
    this.payments = payments;
    this.entryValue = this.calculatePaymentPct('0', this.entryContract);
    this.monthlyValue = this.calculatePaymentPct('1', this.monthlyContract);
    this.singleValue = this.calculatePaymentPct('2', this.singleContract);
    console.log(this.entryValue, this.monthlyValue, this.singleValue);
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



  protected handleError(error: any): void {
    this.snackBar.open('Alguma coisa deu errado', '', {
      duration: 3000,
    });
    console.error(error);
  }

}
