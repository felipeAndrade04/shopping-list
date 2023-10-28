export interface Shopping {
  id: string;
  name: string;
  created_at: Date;
  products: Product[];
}

export interface Product {
  category: string;
  checked?: boolean;
  id: string;
  name: string;
  quantity: number;
}
