import { BaseResourceModel } from 'src/app/shared/models/base-resource.model';

export class Saving extends BaseResourceModel {
  constructor(
    public id?: number,
    public type?: string,
    public amount?: number,
    public simulation?: boolean) {
      super();
    }

  get simText(): string {
      return this.simulation ? 'Previsão' : 'Real';
  }

  static types = {
      PP: 'Poupânça',
      PPR: 'PPR',
      FGTS: 'FGTS',
      CDB: 'CDB',
      TES: 'Tesouro Direto',
      CAR: 'Carro',
      PREV: 'Previdência'
  };

  static fromJson(jsonData: any): Saving {
      return Object.assign(new Saving(), jsonData);
  }
}
