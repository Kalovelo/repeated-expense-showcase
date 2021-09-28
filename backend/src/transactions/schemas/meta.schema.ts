import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Meta extends Document {
  @Prop({ type: String })
  provider_transaction_id: string;

  @Prop({ type: String })
  provider_source: string;

  @Prop({ type: String })
  transaction_time: Date;
}
export const MetaSchema = SchemaFactory.createForClass(Meta);
