import React from 'react';

const Settings: React.FC = () => {
    return (
        <div className="max-w-4xl space-y-8">
            <h2 className="text-2xl font-bold text-gray-800">Settings</h2>

            {/* Profile Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">Business Profile</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Store Name</label>
                        <input type="text" defaultValue="Downtown Market" className="w-full border-gray-300 rounded-lg border px-3 py-2 focus:ring-green-500 focus:border-green-500" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Location ID</label>
                        <input type="text" defaultValue="LOC-4522" disabled className="w-full border-gray-300 bg-gray-50 rounded-lg border px-3 py-2 text-gray-500" />
                    </div>
                </div>
            </div>

            {/* Notification Preferences */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">Notifications</h3>
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="font-medium text-gray-800">Daily Waste Report</p>
                            <p className="text-sm text-gray-500">Receive a summary of potential waste every morning.</p>
                        </div>
                        <input type="checkbox" defaultChecked className="h-5 w-5 text-green-600 rounded border-gray-300 focus:ring-green-500" />
                    </div>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="font-medium text-gray-800">Urgent Expiry Alerts</p>
                            <p className="text-sm text-gray-500">Notify when products are 2 days from expiry.</p>
                        </div>
                        <input type="checkbox" defaultChecked className="h-5 w-5 text-green-600 rounded border-gray-300 focus:ring-green-500" />
                    </div>
                </div>
            </div>

            {/* Integrations */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">Integrations</h3>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">POS System API Key</label>
                        <input type="password" value="************************" className="w-full border-gray-300 rounded-lg border px-3 py-2 focus:ring-green-500 focus:border-green-500" />
                    </div>
                    <div className="flex justify-end">
                        <button className="text-sm text-green-600 font-medium hover:text-green-800">Test Connection</button>
                    </div>
                </div>
            </div>
            
            <div className="flex justify-end pt-4">
                 <button className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 shadow-sm font-medium">
                     Save Changes
                 </button>
            </div>
        </div>
    );
};

export default Settings;