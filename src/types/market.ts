export interface Product {
  id: string;
  name: string;
  category: string;
  price: number; // PKR
  unit?: string;
  inStock: boolean;
  tag?: string;
}

export interface Shop {
  id: string;
  marketId: number;
  name: string;
  shopNumber: string;
  floor: string;
  category: string;
  rating: number;
  reviewsCount: number;
  isVerified: boolean;
  productCount: number;
  description: string;
  featuredProducts: Product[];
}

export interface Market {
  id: number;
  name: string;
  area: string;
  district: string;
  latitude: number;
  longitude: number;
  // Normalized percentage position (0-100%) for stylized vector map of Karachi
  mapX: number;
  mapY: number;
  status: 'active' | 'inactive';
  shopsCount: number;
  productsCount: number;
  tagline: string;
  timing: string;
  specialties: string[];
  sampleShops: Shop[];
}
