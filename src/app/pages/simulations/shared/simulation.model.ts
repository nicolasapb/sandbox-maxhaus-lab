import { BaseResourceModel } from 'src/app/shared/models/base-resource.model';

export class Simulation extends BaseResourceModel {
  constructor(
    public id?: number,
    public composition?: string,
    public total?: number,
    public entry?: number,
    public entryPct?: number,
    public funding?: number,
    public fundingPct?: number,
    public renovation?: number,
    public installment?: number,
    public fundFees?: boolean,
    public composeIncome?: boolean,
    public interest?: number,
    public term?: number,
    public simDate?: Date
    ) {
    super();
  }

  get fundFeesText(): string {
      return this.fundFees ? 'Sim' : 'Não';
  }

  get composeIncomeText(): string {
      return this.composeIncome ? 'Sim' : 'Não';
  }

  static fromJson(jsonData: any): Simulation {
      return Object.assign(new Simulation(), jsonData);
  }
}
