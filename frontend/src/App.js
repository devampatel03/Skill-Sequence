

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/dashboard';
import Home_component from './components/home';

function App() {
    return (
        <Router>
            <Routes>
            <Route path="/" element={<><Home_component/></>} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/dashboard/video/:id" element={<><Dashboard/></>} />
                <Route path="/dashboard/training-completed" element={<><Home_component/></>} />
            </Routes>
        </Router>
    );
}

export default App;
