import { BaseResourceModel } from 'src/app/shared/models/base-resource.model';

export class Payment extends BaseResourceModel {

  constructor(
    public id?: number,
    public recipient?: string,
    public dueDate?: Date,
    public amount?: number,
    public payDate?: Date,
    public payAmount?: number,
    public auth?: string,
    public account?: string,
    public cnpj?: string,
    public type?: string,
    public paid?: boolean
  ) {
    super();
  }

  get paidText(): string {
      return this.paid ? 'Pago' : 'Pendente';
  }

  static types = {
      0: 'Entrada',
      1: 'Mensal',
      2: 'Única'
  };

  static fromJson(jsonData: any): Payment {
      return Object.assign(new Payment(), jsonData);
  }
}
