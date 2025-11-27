import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

// Definicja pojedynczej pozycji (nie jest osobną kolekcją, tylko schematem)
@Schema()
export class EstimateItem {
  @Prop({ required: true })
  type: 'material' | 'service'; // [cite: 30, 35]

  @Prop({ required: true })
  name: string;

  @Prop()
  quantity?: number; // Tylko dla materiału [cite: 32]

  @Prop()
  unit?: string; // np. szt, m2 [cite: 33]

  @Prop()
  unitPrice?: number; // Cena jedn. [cite: 34]

  @Prop({ required: true })
  value: number; // Wartość pozycji [cite: 39, 40]
}
const EstimateItemSchema = SchemaFactory.createForClass(EstimateItem);

// Główny dokument Kosztorysu
@Schema({ timestamps: true }) // Automatyczne createdAt 
export class Estimate {
  @Prop({ required: true })
  title: string;

  @Prop({ type: [EstimateItemSchema], default: [] })
  items: EstimateItem[]; // Lista pozycji 

  @Prop({ default: 0 })
  totalAmount: number; // Suma całkowita [cite: 5]
}

export const EstimateSchema = SchemaFactory.createForClass(Estimate);