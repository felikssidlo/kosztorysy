export type EstimateItemType = 'material' | 'service';

export interface EstimateItem {
  _id?: string;
  type: EstimateItemType;
  name: string;
  quantity?: number;
  unit?: string;
  unitPrice?: number;
  value: number;
}

export interface Estimate {
  _id: string;
  title: string;
  items: EstimateItem[];
  totalAmount: number;
  createdAt: string;
  updatedAt: string;
}