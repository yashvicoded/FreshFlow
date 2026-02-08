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

            {/* Filters */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col sm:flex-row gap-4 items-center justify-between">
                <div className="relative w-full sm:w-96">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input 
                        type="text" 
                        placeholder="Search products..." 
                        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex items-center gap-2 w-full sm:w-auto">
                    <Filter className="text-gray-400" size={20} />
                    <select 
                        className="bg-gray-50 border border-gray-200 text-gray-700 py-2 px-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        value={filterCategory}
                        onChange={(e) => setFilterCategory(e.target.value)}
                    >
                        <option value="All">All Categories</option>
                        <option value="Dairy">Dairy</option>
                        <option value="Produce">Produce</option>
                        <option value="Meat">Meat</option>
                        <option value="Bakery">Bakery</option>
                    </select>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-100">
                                <th className="px-6 py-4 font-medium text-gray-500 text-sm">Product</th>
                                <th className="px-6 py-4 font-medium text-gray-500 text-sm">Category</th>
                                <th className="px-6 py-4 font-medium text-gray-500 text-sm">Quantity</th>
                                <th className="px-6 py-4 font-medium text-gray-500 text-sm">Expiry Date</th>
                                <th className="px-6 py-4 font-medium text-gray-500 text-sm">Status</th>
                                <th className="px-6 py-4 font-medium text-gray-500 text-sm">Action</th>
                                <th className="px-6 py-4 font-medium text-gray-500 text-sm"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {filteredProducts.map((item) => {
                                const status = getStatus(item.expiryDate);
                                return (
                                    <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center space-x-3">
                                                <img src={item.image} alt={item.name} className="w-10 h-10 rounded-lg object-cover" />
                                                <span className="font-medium text-gray-800">{item.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-gray-600">{item.category}</td>
                                        <td className="px-6 py-4 text-gray-800 font-medium">{item.quantity} {item.unit}</td>
                                        <td className="px-6 py-4 text-gray-600">{format(new Date(item.expiryDate), 'MMM dd, yyyy')}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(status)}`}>
                                                {status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            {status === ProductStatus.NearExpiry && (
                                                <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">Discount</button>
                                            )}
                                            {status === ProductStatus.Urgent && (
                                                <button className="text-orange-600 hover:text-orange-800 text-sm font-medium">Redistribute</button>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-gray-400 cursor-pointer hover:text-gray-600">
                                            <MoreHorizontal size={20} />
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
            
            {filteredProducts.length === 0 && (
                <div className="flex flex-col items-center justify-center py-12 text-gray-500">
                    <AlertCircle size={48} className="mb-3 text-gray-300" />
                    <p>No products found matching your criteria.</p>
                </div>
            )}
        </div>
    );
};

export default Inventory;