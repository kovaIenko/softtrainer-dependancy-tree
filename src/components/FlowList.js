import React, { useEffect } from 'react';
import axios from 'axios';

const FlowList = ({ token, flows, setFlows, setSelectedFlow }) => {
    useEffect(() => {
        // Fetch available flows after login
        const fetchFlows = async () => {
            try {
                const response = await axios.get('/flows', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setFlows(response.data); // Update flows state in App
            } catch (error) {
                console.error('Error fetching flows', error);
            }
        };
        fetchFlows();
    }, [token, setFlows]);

    const handleFlowSelect = (flow) => {
        setSelectedFlow(flow);
        window.location.href = '/graph'; // Redirect to graph view
    };

    return (
        <div className="flow-list-container">
            <h2>Available Flows</h2>
            <ul>
                {flows.map(flow => (
                    <li key={flow.id} onClick={() => handleFlowSelect(flow)}>
                        {flow.name}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FlowList;
