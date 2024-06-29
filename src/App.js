// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ImageUpload from './components/ImageUpload';
import Inventory from './components/inventory';

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<ImageUpload />} />
                    <Route path="/inventory" element={<Inventory />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
