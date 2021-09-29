import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
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
export class Transaction extends Document {
  @ApiProperty({ required: false })
  @Prop({ required: true, unique: true })
  transaction_id: string;

  @ApiProperty({ required: false })
  @Prop({ required: true })
  description: string;

  @ApiProperty({ required: false })
  @Prop({ required: true })
  amount: number;

  @ApiProperty({ required: false })
  @Prop({ required: false })
  merchant_name?: string;

  @ApiProperty({ required: false })
  @Prop({ type: String, enum: ['GBP', 'EUR', 'USD', 'JPY'], required: true })
  currency: CurrencyEnum;

  @ApiProperty({ required: false })
  @Prop({ type: String, enum: ['DEBIT', 'CREDIT'], required: true })
  transaction_type: TransactionTypeEnum;

  @ApiProperty({ required: false })
  @Prop({
    type: String,
    enum: ['PURCHASE', 'OTHER', 'DIRECT_DEBIT', 'TRANSFER'],
    required: true,
  })
  transaction_category: TransactionCategoryEnum;

  @ApiProperty({ required: false })
  @Prop({ required: true, default: [] })
  transaction_classification: string[];

  @ApiProperty({ required: false, format: 'date-time', type: Date })
  @Prop({ type: Date, required: true })
  timestamp: Date;

  @ApiProperty({ required: false, type: Meta })
  @Prop({ type: Meta, required: true })
  meta: IMeta;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
