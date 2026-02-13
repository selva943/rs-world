export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  wholesalePrice?: number;
  image: string;
  stock: number;
  inStock: boolean;
  description?: string;
}

export interface RentalTool {
  id: string;
  name: string;
  brand: string;
  image: string;
  rentPerDay: number;
  rentPerHour?: number;
  deposit: number;
  available: boolean;
  description?: string;
}

export interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Enquiry {
  id: string;
  name: string;
  phone: string;
  message: string;
  type: 'product' | 'rental' | 'general';
  date: string;
}
