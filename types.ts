export enum ProductCategory {
    Dairy = 'Dairy',
    Produce = 'Produce',
    Meat = 'Meat',
    Bakery = 'Bakery',
    Canned = 'Canned Goods',
    Beverage = 'Beverage'
}

export enum ProductStatus {
    Fresh = 'Fresh',
    NearExpiry = 'Near Expiry',
    Urgent = 'Urgent',
    Expired = 'Expired'
}

export interface Product {
    id: string;
    name: string;
    category: ProductCategory;
    quantity: number;
    unit: string;
    expiryDate: string; // ISO Date string
    price: number;
    originalPrice: number;
    image: string;
}

export interface Partner {
    id: string;
    name: string;
    type: 'Charity' | 'Food Bank' | 'Discount Retailer';
    distance: number; // km
    capacity: string;
}

export interface SalesData {
    date: string;
    sales: number;
    predicted?: number;
}
