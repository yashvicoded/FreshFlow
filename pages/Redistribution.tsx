import React from 'react';
import { MOCK_PARTNERS, MOCK_INVENTORY } from '../constants';
import { MapPin, Truck, Heart, ExternalLink } from 'lucide-react';
import { differenceInDays } from 'date-fns';

const Redistribution: React.FC = () => {
    // Filter items that are urgent
    const urgentItems = MOCK_INVENTORY.filter(item => {
        const days = differenceInDays(new Date(item.expiryDate), new Date());
        return days < 4;
    });

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Redistribution Network</h2>
            <p className="text-gray-600">Connect with local charities and partners to minimize waste.</p>

            {/* Two Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                
                {/* Left: Available for Donation */}
                <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                        <Heart className="mr-2 text-red-500" size={20} /> Items for Donation
                    </h3>
                    <div className="space-y-4">
                        {urgentItems.length > 0 ? (
                            urgentItems.map(item => (
                                <div key={item.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex gap-4">
                                    <img src={item.image} alt={item.name} className="w-20 h-20 rounded-lg object-cover bg-gray-100" />
                                    <div className="flex-1">
                                        <div className="flex justify-between items-start">
                                            <h4 className="font-bold text-gray-800">{item.name}</h4>
                                            <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full font-medium">Urgent</span>
                                        </div>
                                        <p className="text-sm text-gray-500 mt-1">{item.quantity} {item.unit} • Expires in {differenceInDays(new Date(item.expiryDate), new Date())} days</p>
                                        <button className="mt-3 text-sm bg-gray-900 text-white px-3 py-1.5 rounded-lg hover:bg-gray-800 transition-colors w-full sm:w-auto">
                                            List for Pickup
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="bg-gray-50 p-6 rounded-xl border border-dashed text-center text-gray-500">
                                No urgent items require redistribution right now. Good job!
                            </div>
                        )}
                    </div>
                </div>

                {/* Right: Partner Directory */}
                <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                        <Truck className="mr-2 text-blue-500" size={20} /> Nearby Partners
                    </h3>
                    <div className="space-y-4">
                        {MOCK_PARTNERS.map(partner => (
                            <div key={partner.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h4 className="font-bold text-gray-800">{partner.name}</h4>
                                        <div className="flex items-center text-sm text-gray-500 mt-1">
                                            <MapPin size={14} className="mr-1" />
                                            {partner.distance} km away • {partner.type}
                                        </div>
                                    </div>
                                    <button className="p-2 text-gray-400 hover:text-green-600 transition-colors">
                                        <ExternalLink size={18} />
                                    </button>
                                </div>
                                <div className="mt-4 flex items-center justify-between">
                                    <span className={`text-xs px-2 py-1 rounded border ${
                                        partner.capacity === 'High' 
                                            ? 'bg-green-50 text-green-700 border-green-100' 
                                            : 'bg-yellow-50 text-yellow-700 border-yellow-100'
                                    }`}>
                                        Capacity: {partner.capacity}
                                    </span>
                                    <button className="text-sm font-medium text-green-600 hover:underline">
                                        Send Offer
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* AI Match Suggestion Mockup */}
                    <div className="mt-6 bg-gradient-to-r from-green-50 to-blue-50 p-5 rounded-xl border border-green-100">
                        <h4 className="font-bold text-gray-800 mb-2 text-sm uppercase tracking-wide">Smart Match</h4>
                        <p className="text-sm text-gray-700">
                            Based on your location and inventory, <strong>City Harvest Food Bank</strong> is the optimal partner for your perishable dairy goods.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Redistribution;