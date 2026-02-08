import React from 'react';
import { 
    ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, 
    PieChart, Pie, Cell, Legend 
} from 'recharts';
import { AlertTriangle, DollarSign, Package, Recycle } from 'lucide-react';
import { MOCK_INVENTORY, generateSalesData } from '../constants';
import { differenceInDays } from 'date-fns';

const Dashboard: React.FC = () => {
    // KPI Calculations
    const totalItems = MOCK_INVENTORY.reduce((acc, item) => acc + item.quantity, 0);
    const expiringSoon = MOCK_INVENTORY.filter(item => {
        const days = differenceInDays(new Date(item.expiryDate), new Date());
        return days >= 0 && days <= 7;
    }).length;
    
    // Mock Data for Charts
    const salesData = generateSalesData().slice(0, 14); // Last 14 days
    const categoryData = [
        { name: 'Dairy', value: 30 },
        { name: 'Produce', value: 45 },
        { name: 'Meat', value: 15 },
        { name: 'Bakery', value: 10 },
    ];
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Dashboard Overview</h2>
            
            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
                    <div>
                        <p className="text-sm text-gray-500 font-medium">Total Inventory</p>
                        <p className="text-3xl font-bold text-gray-800 mt-1">{totalItems}</p>
                    </div>
                    <div className="p-3 bg-blue-50 text-blue-600 rounded-full">
                        <Package size={24} />
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
                    <div>
                        <p className="text-sm text-gray-500 font-medium">Expiring (7 Days)</p>
                        <p className="text-3xl font-bold text-orange-600 mt-1">{expiringSoon}</p>
                    </div>
                    <div className="p-3 bg-orange-50 text-orange-600 rounded-full">
                        <AlertTriangle size={24} />
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
                    <div>
                        <p className="text-sm text-gray-500 font-medium">Waste Prevented</p>
                        <p className="text-3xl font-bold text-green-600 mt-1">124 kg</p>
                    </div>
                    <div className="p-3 bg-green-50 text-green-600 rounded-full">
                        <Recycle size={24} />
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
                    <div>
                        <p className="text-sm text-gray-500 font-medium">Cost Savings</p>
                        <p className="text-3xl font-bold text-gray-800 mt-1">$1,240</p>
                    </div>
                    <div className="p-3 bg-purple-50 text-purple-600 rounded-full">
                        <DollarSign size={24} />
                    </div>
                </div>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Trend Chart */}
                <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Waste Prevention Trend (30 Days)</h3>
                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={salesData}>
                                <defs>
                                    <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#10B981" stopOpacity={0.8}/>
                                        <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fill: '#6B7280'}} />
                                <YAxis axisLine={false} tickLine={false} tick={{fill: '#6B7280'}} />
                                <Tooltip 
                                    contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                                />
                                <Area type="monotone" dataKey="sales" stroke="#10B981" strokeWidth={2} fillOpacity={1} fill="url(#colorSales)" name="Saved ($)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Category Pie Chart */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Inventory by Category</h3>
                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={categoryData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={100}
                                    fill="#8884d8"
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {categoryData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend verticalAlign="bottom" height={36}/>
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;