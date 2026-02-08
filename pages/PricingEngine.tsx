import React, { useState } from 'react';
import { MOCK_INVENTORY } from '../constants';
import { differenceInDays } from 'date-fns';
import { ArrowRight, Calculator, CheckCircle, TrendingUp } from 'lucide-react';
import { Product } from '../types';

const PricingEngine: React.FC = () => {
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    const calculatePricing = (product: Product) => {
        const days = differenceInDays(new Date(product.expiryDate), new Date());
        let discount = 0;
        let recommendation = "Maintain Price";

        if (days <= 0) {
            discount = 0.70;
            recommendation = "Flash Sale / Clearance";
        } else if (days <= 2) {
            discount = 0.50;
            recommendation = "Urgent Discount";
        } else if (days <= 4) {
            discount = 0.30;
            recommendation = "Promotion";
        } else if (days <= 6) {
            discount = 0.15;
            recommendation = "Early Discount";
        }

        const newPrice = product.originalPrice * (1 - discount);
        const estimatedRevenue = newPrice * product.quantity;
        const wasteCost = product.originalPrice * product.quantity; // assuming cost is lost revenue

        return { discount, recommendation, newPrice, estimatedRevenue, wasteCost, days };
    };

    const calculation = selectedProduct ? calculatePricing(selectedProduct) : null;

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Dynamic Pricing Engine</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Product Selection */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="font-semibold text-gray-700 mb-4 flex items-center">
                        <Calculator className="mr-2" size={20} /> Select Product
                    </h3>
                    <div className="space-y-3 max-h-[500px] overflow-y-auto">
                        {MOCK_INVENTORY.map(product => (
                            <div 
                                key={product.id}
                                onClick={() => setSelectedProduct(product)}
                                className={`p-3 rounded-lg border cursor-pointer transition-all flex items-center gap-3 ${
                                    selectedProduct?.id === product.id 
                                        ? 'border-green-500 bg-green-50' 
                                        : 'border-gray-200 hover:border-green-300'
                                }`}
                            >
                                <img src={product.image} alt={product.name} className="w-12 h-12 rounded bg-gray-200 object-cover" />
                                <div>
                                    <p className="font-medium text-gray-800">{product.name}</p>
                                    <p className="text-sm text-gray-500">${product.originalPrice.toFixed(2)} • {product.quantity} units</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Calculation View */}
                {selectedProduct && calculation ? (
                    <div className="lg:col-span-2 space-y-6">
                        {/* Result Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                                <p className="text-gray-500 text-sm">Current Status</p>
                                <div className="flex justify-between items-end mt-2">
                                    <div>
                                        <p className="text-3xl font-bold text-gray-800">${selectedProduct.originalPrice.toFixed(2)}</p>
                                        <p className="text-sm text-gray-500 mt-1">{calculation.days} days to expiry</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-medium text-gray-600">Stock Value</p>
                                        <p className="text-lg font-bold text-gray-800">${(selectedProduct.originalPrice * selectedProduct.quantity).toFixed(2)}</p>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="bg-green-600 p-6 rounded-xl shadow-sm text-white">
                                <p className="text-green-100 text-sm">Recommended Price</p>
                                <div className="flex justify-between items-end mt-2">
                                    <div>
                                        <p className="text-3xl font-bold">${calculation.newPrice.toFixed(2)}</p>
                                        <span className="inline-block px-2 py-1 bg-white/20 rounded text-xs mt-2 font-semibold">
                                            {(calculation.discount * 100).toFixed(0)}% OFF
                                        </span>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-medium text-green-100">Est. Recovery</p>
                                        <p className="text-lg font-bold">${calculation.estimatedRevenue.toFixed(2)}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Analysis Detail */}
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">Pricing Analysis</h3>
                            
                            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                                <div className="flex-1 w-full">
                                    <div className="flex justify-between text-sm mb-2">
                                        <span className="text-gray-600">Price reduction efficiency</span>
                                        <span className="font-bold text-green-600">High</span>
                                    </div>
                                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                        <div className="h-full bg-green-500 w-3/4"></div>
                                    </div>
                                    <p className="text-xs text-gray-500 mt-2">
                                        Based on historical data, a {calculation.discount * 100}% discount usually results in 85% sell-through within 24 hours.
                                    </p>
                                </div>
                                
                                <div className="flex-shrink-0 bg-blue-50 p-4 rounded-lg border border-blue-100 max-w-sm">
                                    <div className="flex items-start gap-3">
                                        <TrendingUp className="text-blue-600 mt-1" size={20} />
                                        <div>
                                            <p className="font-semibold text-blue-900">Recommendation</p>
                                            <p className="text-sm text-blue-700 mt-1">
                                                {calculation.recommendation}. Updating the price now can prevent a potential loss of ${calculation.wasteCost.toFixed(2)}.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 flex justify-end">
                                <button className="flex items-center space-x-2 px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors">
                                    <CheckCircle size={20} />
                                    <span>Apply New Price</span>
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="lg:col-span-2 flex flex-col items-center justify-center bg-gray-50 rounded-xl border border-dashed border-gray-300 min-h-[400px]">
                        <ArrowRight className="text-gray-300 mb-4" size={48} />
                        <p className="text-gray-500 text-lg">Select a product to calculate optimal pricing</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PricingEngine;