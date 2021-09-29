import Meta from './meta.interface';

export enum CurrencyEnum {
  GBP = 'GBP',
  EUR = 'EUR',
  USD = 'USD',
  JPY = 'JPY',
}

export enum TransactionTypeEnum {
  DEBIT = 'DEBIT',
  CREDIT = 'CREDIT',
}

export enum TransactionCategoryEnum {
  PURCHASE = 'PURCHASE',
  OTHER = 'OTHER',
  DIRECT_DEBIT = 'DIRECT_DEBIT',
  TRANSFER = 'TRANSFER',
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
