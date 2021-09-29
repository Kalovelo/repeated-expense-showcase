import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';
import { Timestamp } from 'typeorm';

@Schema()
export class RepeatingExpense extends Document {
  @ApiProperty({ required: false })
  @Prop({ type: String })
  transaction_description: string;

  @ApiProperty({ required: false })
  @Prop({ type: Number })
  transaction_amount: number;

  @ApiProperty({ required: false, format: 'date-time', type: Timestamp })
  @Prop({ type: Date })
  transaction_date: Date;
}
export const MetaSchema = SchemaFactory.createForClass(RepeatingExpense);
