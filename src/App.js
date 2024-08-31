import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import FlowList from './components/FlowList';
import Graph from './components/Graph';

function App() {
    const [token, setToken] = useState(null); // State to store JWT token
    const [flows, setFlows] = useState([]); // State to store list of flows
    const [selectedFlow, setSelectedFlow] = useState(null); // State for the selected flow data

    useEffect(() => {
        // Retrieve token from localStorage when the app loads
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            setToken(storedToken);
        }
    }, []);

    return (
        <Router>
            <Routes>
                {/* Route for Login Screen */}
                <Route path="/login" element={<Login setToken={setToken} />} />

                {/* Route for Flow List Screen */}
                <Route path="/flows" element={
                    token ? <FlowList token={token} flows={flows} setFlows={setFlows} setSelectedFlow={setSelectedFlow} />
                        : <Navigate to="/login" />
                } />

                {/* Route for Graph Visualization Screen */}
                <Route path="/graph" element={
                    selectedFlow ? <Graph data={selectedFlow} />
                        : <Navigate to="/flows" />
                } />

                {/* Default Redirect to Login */}
                <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
        </Router>
    );
}

export default App;
