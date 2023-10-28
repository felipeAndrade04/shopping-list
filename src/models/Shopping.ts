export interface Shopping {
  id: string;
  name: string;
  created_at: Date;
  products: Product[];
}

export interface Product {
  id: string;
  name: string;
  category: string;
  quantity?: number;
  checked?: boolean;
}
