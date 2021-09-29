import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';
import { Timestamp } from 'typeorm';

@Schema()
export class Meta extends Document {
  @ApiProperty({ required: false })
  @Prop({ type: String })
  provider_transaction_id: string;

  @ApiProperty({ required: false })
  @Prop({ type: String })
  provider_source: string;

  @ApiProperty({ required: false, format: 'date-time', type: Timestamp })
  @Prop({ type: Date })
  transaction_time: Date;
}
export const MetaSchema = SchemaFactory.createForClass(Meta);
