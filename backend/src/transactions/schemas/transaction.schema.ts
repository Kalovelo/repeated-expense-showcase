import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import IMeta from '../interfaces/meta.interface';
import {
  CurrencyEnum,
  TransactionCategoryEnum,
  TransactionTypeEnum,
} from '../interfaces/transaction.interface';
import { Meta } from './meta.schema';

export type TransactionDocument = Transaction & Document;

@Schema()
export class Transaction {
  @Prop({ required: true, unique: true })
  transaction_id: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  amount: number;

  @Prop({ required: false })
  merchant_name?: string;

  @Prop({ type: String, enum: ['GBP', 'EUR', 'USD', 'JPY'], required: true })
  currency: CurrencyEnum;

  @Prop({ type: String, enum: ['DEBIT', 'CREDIT'], required: true })
  transaction_type: TransactionTypeEnum;

  @Prop({
    type: String,
    enum: ['PURCHASE', 'OTHER', 'DIRECT_DEBIT', 'TRANSFER'],
    required: true,
  })
  transaction_category: TransactionCategoryEnum;

  @Prop({ required: true, default: [] })
  transaction_classification: string[];

  @Prop({ type: Date, required: true })
  timestamp: Date;

  @Prop({ type: Meta, required: true })
  meta: IMeta;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
