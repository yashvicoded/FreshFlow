import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { Droplet, Leaf, DollarSign } from 'lucide-react';

const Analytics: React.FC = () => {
    const savingsData = [
        { month: 'Jan', saved: 1200, potential: 1500 },
        { month: 'Feb', saved: 1900, potential: 2000 },
        { month: 'Mar', saved: 1500, potential: 1700 },
        { month: 'Apr', saved: 2200, potential: 2400 },
        { month: 'May', saved: 2800, potential: 3000 },
    ];

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Analytics & Impact Report</h2>

            {/* Environmental Impact Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-emerald-600 rounded-xl p-6 text-white shadow-lg">
                    <div className="flex items-center justify-between mb-4">
                        <Leaf className="opacity-80" size={32} />
                        <span className="text-sm font-medium bg-emerald-500 px-2 py-1 rounded">All Time</span>
                    </div>
                    <h3 className="text-4xl font-bold">850 kg</h3>
                    <p className="text-emerald-100 mt-1">CO2 Emissions Prevented</p>
                </div>

                <div className="bg-blue-500 rounded-xl p-6 text-white shadow-lg">
                    <div className="flex items-center justify-between mb-4">
                        <Droplet className="opacity-80" size={32} />
                        <span className="text-sm font-medium bg-blue-400 px-2 py-1 rounded">All Time</span>
                    </div>
                    <h3 className="text-4xl font-bold">12,400 L</h3>
                    <p className="text-blue-100 mt-1">Water Saved</p>
                </div>

                <div className="bg-gray-800 rounded-xl p-6 text-white shadow-lg">
                    <div className="flex items-center justify-between mb-4">
                        <DollarSign className="opacity-80" size={32} />
                        <span className="text-sm font-medium bg-gray-700 px-2 py-1 rounded">This Year</span>
                    </div>
                    <h3 className="text-4xl font-bold">$9,600</h3>
                    <p className="text-gray-300 mt-1">Revenue Recovered</p>
                </div>
            </div>

           
            </div>

            {/* Waste Breakdown Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100">
                    <h3 className="font-semibold text-gray-800">Top Wasted Items (This Month)</h3>
                </div>
                <table className="w-full text-left">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Product</th>
                            <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Category</th>
                            <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Waste Qty</th>
                            <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Lost Value</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                    
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Analytics;
