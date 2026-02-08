import { Product, ProductCategory, Partner, SalesData } from './types';
import { addDays, format } from 'date-fns';

export const MOCK_INVENTORY: Product[] = [
    {
        id: '1',
        name: 'Organic Whole Milk',
        category: ProductCategory.Dairy,
        quantity: 45,
        unit: 'Liters',
        expiryDate: addDays(new Date(), 2).toISOString(),
        price: 4.50,
        originalPrice: 4.50,
        image: 'https://picsum.photos/200/200?random=1'
    },
    {
        id: '2',
        name: 'Sourdough Bread',
        category: ProductCategory.Bakery,
        quantity: 12,
        unit: 'Loaves',
        expiryDate: addDays(new Date(), 1).toISOString(),
        price: 6.00,
        originalPrice: 6.00,
        image: 'https://picsum.photos/200/200?random=2'
    },
    {
        id: '3',
        name: 'Chicken Breast',
        category: ProductCategory.Meat,
        quantity: 30,
        unit: 'kg',
        expiryDate: addDays(new Date(), 5).toISOString(),
        price: 12.00,
        originalPrice: 12.00,
        image: 'https://picsum.photos/200/200?random=3'
    },
    {
        id: '4',
        name: 'Spinach',
        category: ProductCategory.Produce,
        quantity: 50,
        unit: 'Bags',
        expiryDate: addDays(new Date(), 8).toISOString(),
        price: 3.00,
        originalPrice: 3.00,
        image: 'https://picsum.photos/200/200?random=4'
    },
    {
        id: '5',
        name: 'Greek Yogurt',
        category: ProductCategory.Dairy,
        quantity: 20,
        unit: 'Cups',
        expiryDate: addDays(new Date(), -1).toISOString(),
        price: 2.00,
        originalPrice: 2.00,
        image: 'https://picsum.photos/200/200?random=5'
    },
    {
        id: '6',
        name: 'Avocados',
        category: ProductCategory.Produce,
        quantity: 100,
        unit: 'Units',
        expiryDate: addDays(new Date(), 4).toISOString(),
        price: 1.50,
        originalPrice: 1.50,
        image: 'https://picsum.photos/200/200?random=6'
    }
];

export const MOCK_PARTNERS: Partner[] = [
    { id: '1', name: 'City Harvest Food Bank', type: 'Food Bank', distance: 2.4, capacity: 'High' },
    { id: '2', name: 'Community Kitchen', type: 'Charity', distance: 5.1, capacity: 'Medium' },
    { id: '3', name: 'Budget Grocers', type: 'Discount Retailer', distance: 1.2, capacity: 'Low' },
];

export const generateSalesData = (): SalesData[] => {
    const data: SalesData[] = [];
    const today = new Date();
    // Past 30 days
    for (let i = 30; i > 0; i--) {
        data.push({
            date: format(addDays(today, -i), 'MM/dd'),
            sales: Math.floor(Math.random() * 50) + 20,
        });
    }
    // Future 7 days (Prediction)
    for (let i = 0; i < 7; i++) {
        data.push({
            date: format(addDays(today, i), 'MM/dd'),
            sales: 0, // No actual sales yet
            predicted: Math.floor(Math.random() * 40) + 30,
        });
    }
    return data;
};