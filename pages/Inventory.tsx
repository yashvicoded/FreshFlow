import React, { useState } from 'react';
import { MOCK_INVENTORY } from '../constants';
import { Product, ProductStatus } from '../types';
import { differenceInDays, format } from 'date-fns';
import { Search, Filter, MoreHorizontal, Plus, FileDown, AlertCircle } from 'lucide-react';

const Inventory: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterCategory, setFilterCategory] = useState<string>('All');
    const [products, setProducts] = useState<Product[]>(MOCK_INVENTORY);

    const getStatus = (expiryDate: string): ProductStatus => {
        const days = differenceInDays(new Date(expiryDate), new Date());
        if (days < 0) return ProductStatus.Expired;
        if (days < 3) return ProductStatus.Urgent;
        if (days <= 7) return ProductStatus.NearExpiry;
        return ProductStatus.Fresh;
    };

    const getStatusColor = (status: ProductStatus) => {
        switch (status) {
            case ProductStatus.Fresh: return 'bg-green-100 text-green-800';
            case ProductStatus.NearExpiry: return 'bg-yellow-100 text-yellow-800';
            case ProductStatus.Urgent: return 'bg-red-100 text-red-800';
            case ProductStatus.Expired: return 'bg-gray-100 text-gray-600';
        }
    };

    const filteredProducts = products.filter(item => {
        const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = filterCategory === 'All' || item.category === filterCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h2 className="text-2xl font-bold text-gray-800">Smart Inventory</h2>
                <div className="flex gap-3">
                    <button className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
                        <FileDown size={18} />
                        <span>Export CSV</span>
                    </button>
                    <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 shadow-sm">
                        <Plus size={18} />
                        <span>Add Product</span>
                    </button>
                </div>
            </div>

        export default Inventory;
