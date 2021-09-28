import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IMeta } from '../interfaces/meta.interface';
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

  @Prop({ enum: ['GBP', 'EUR', 'USD', 'JPY'], required: true })
  currency: string;

  @Prop({ enum: ['DEBIT', 'CREDIT'], required: true })
  transaction_type: string;

  @Prop({
    enum: ['PURCHASE', 'OTHER', 'DIRECT_DEBIT', 'TRANSFER'],
    required: true,
  })
  transaction_category: string;

  @Prop({ required: true, default: [] })
  transaction_classification: string[];

  @Prop({ type: Date, required: true })
  timestamp: Date;

  @Prop({ type: Meta, required: true })
  meta: IMeta;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
