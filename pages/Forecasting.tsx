import React from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { generateSalesData } from '../constants';
import { AlertCircle, TrendingUp, Calendar } from 'lucide-react';

const Forecasting: React.FC = () => {
    const data = generateSalesData();
    
    // Separate past and future data for better visualization logic if needed, 
    // but Recharts handles nulls well for broken lines.
    // Here we assume the data array has distinct 'sales' (past) and 'predicted' (future) keys
    // We need to massage the data slightly to make sure lines connect or show properly.
    
    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                <h2 className="text-2xl font-bold text-gray-800">Demand Forecasting</h2>
                <div className="flex items-center space-x-2 bg-white px-3 py-2 rounded-lg border border-gray-200">
                    <Calendar size={18} className="text-gray-500" />
                    <span className="text-sm text-gray-600">Next 7 Days</span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Chart Area */}
                <div className="lg:col-span-3 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-800 mb-6">Sales vs Prediction (Milk - 1L)</h3>
                    <div className="h-96">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={data}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fill: '#6B7280'}} />
                                <YAxis axisLine={false} tickLine={false} tick={{fill: '#6B7280'}} />
                                <Tooltip 
                                    contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                                />
                                <Legend />
                                <Line 
                                    type="monotone" 
                                    dataKey="sales" 
                                    stroke="#3B82F6" 
                                    strokeWidth={3} 
                                    name="Actual Sales"
                                    dot={{ r: 4 }}
                                />
                                <Line 
                                    type="monotone" 
                                    dataKey="predicted" 
                                    stroke="#10B981" 
                                    strokeWidth={3} 
                                    strokeDasharray="5 5" 
                                    name="Predicted Demand"
                                    dot={{ r: 4 }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Sidebar Alerts */}
                <div className="space-y-6">
                    <div className="bg-blue-50 p-5 rounded-xl border border-blue-100">
                        <div className="flex items-center gap-3 mb-2">
                            <TrendingUp className="text-blue-600" size={20} />
                            <h4 className="font-semibold text-blue-900">Trend Alert</h4>
                        </div>
                        <p className="text-sm text-blue-800">
                            Demand for <strong>Dairy</strong> is trending up by 12% this week due to the upcoming holiday.
                        </p>
                    </div>

                    <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                        <h4 className="font-semibold text-gray-800 mb-4">Stock Recommendations</h4>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                                <AlertCircle className="text-orange-500 mt-0.5 flex-shrink-0" size={18} />
                                <div>
                                    <p className="text-sm font-medium text-gray-800">Whole Milk</p>
                                    <p className="text-xs text-gray-500">Predicted shortage in 2 days. Order +20 units.</p>
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <AlertCircle className="text-green-500 mt-0.5 flex-shrink-0" size={18} />
                                <div>
                                    <p className="text-sm font-medium text-gray-800">Avocados</p>
                                    <p className="text-xs text-gray-500">Stock optimal. Maintain current levels.</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Detailed Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full text-left">
                    <thead>
                        <tr className="bg-gray-50 border-b border-gray-100">
                            <th className="px-6 py-4 font-medium text-gray-500 text-sm">Date</th>
                            <th className="px-6 py-4 font-medium text-gray-500 text-sm">Predicted Sales</th>
                            <th className="px-6 py-4 font-medium text-gray-500 text-sm">Current Stock</th>
                            <th className="px-6 py-4 font-medium text-gray-500 text-sm">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {data.slice(-5).map((row, idx) => (
                            <tr key={idx}>
                                <td className="px-6 py-4 text-gray-800">{row.date}</td>
                                <td className="px-6 py-4 font-medium text-gray-800">{row.predicted || row.sales} units</td>
                                <td className="px-6 py-4 text-gray-500">45 units</td>
                                <td className="px-6 py-4">
                                    {(row.predicted || 0) > 40 ? (
                                        <span className="text-red-600 text-sm font-medium">Reorder Soon</span>
                                    ) : (
                                        <span className="text-green-600 text-sm font-medium">Sufficient</span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Forecasting;