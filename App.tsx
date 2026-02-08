import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Inventory from './pages/Inventory';
import PricingEngine from './pages/PricingEngine';
import Forecasting from './pages/Forecasting';
import Redistribution from './pages/Redistribution';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';

const App: React.FC = () => {
    return (
        <Router>
            <div className="flex min-h-screen bg-gray-50">
                <Sidebar />
                <main className="flex-1 overflow-x-hidden overflow-y-auto">
                    <div className="container mx-auto px-4 sm:px-6 py-8">
                        <Routes>
                            <Route path="/" element={<Dashboard />} />
                            <Route path="/inventory" element={<Inventory />} />
                            <Route path="/pricing" element={<PricingEngine />} />
                            <Route path="/forecasting" element={<Forecasting />} />
                            <Route path="/redistribution" element={<Redistribution />} />
                            <Route path="/analytics" element={<Analytics />} />
                            <Route path="/settings" element={<Settings />} />
                        </Routes>
                    </div>
                </main>
            </div>
        </Router>
    );
};

export default App;