import Meta from './meta.interface';

export enum CurrencyEnum {
  GBP,
  EUR,
  USD,
  JPY,
}

export enum TransactionTypeEnum {
  DEBIT,
  CREDIT,
}

export enum TransactionCategoryEnum {
  PURCHASE,
  OTHER,
  DIRECT_DEBIT,
  TRANSFER,
}

export interface Transaction {
  transaction_id: string;
  description: string;
  amount: number;
  merchant_name?: string;
  currency: CurrencyEnum;
  transaction_type: TransactionTypeEnum;
  transaction_category: TransactionCategoryEnum;
  transaction_classification: string[];
  timestamp: Date;
  meta: Meta;
}
