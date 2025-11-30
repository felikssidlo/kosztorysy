import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class EstimateItem {
  @Prop({ required: true })
  type: 'material' | 'service';

  @Prop({ required: true })
  name: string;

  @Prop()
  quantity?: number;

  @Prop()
  unit?: string;

  @Prop()
  unitPrice?: number;

  @Prop({ required: true })
  value: number;
}
const EstimateItemSchema = SchemaFactory.createForClass(EstimateItem);

// Główny dokument Kosztorysu
@Schema({ timestamps: true })
export class Estimate {
  @Prop({ required: true })
  title: string;

  @Prop({ type: [EstimateItemSchema], default: [] })
  items: EstimateItem[];

  @Prop({ default: 0 })
  totalAmount: number;
}

export const EstimateSchema = SchemaFactory.createForClass(Estimate);
