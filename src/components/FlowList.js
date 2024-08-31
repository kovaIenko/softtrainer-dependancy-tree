import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

const FlowList = ({token, flows, setFlows, setSelectedFlow}) => {
    const navigate = useNavigate(); // Initialize useNavigate hook
    const [loading, setLoading] = useState(true); // State to manage loading
    const [error, setError] = useState(null); // State to manage errors

    useEffect(() => {
        // Fetch available flows after login
        const fetchFlows = async () => {
            try {
                const serverUrl = "https://api.thesofttrainer.com";
                const response = await axios.get(serverUrl + '/flow/get', {
                    headers: {Authorization: `Bearer ${token}`}
                });
                setFlows(response.data.simulations); // Update flows state in App
                setLoading(false); // Set loading to false after data is fetched
            } catch (error) {
                console.error('Error fetching flows', error);
                setError('Failed to fetch flows. Please try again later.'); // Set error state
                setLoading(false); // Set loading to false even on error
                localStorage.removeItem('token');
            }
        };
        fetchFlows();
    }, [token, setFlows]);

    const handleFlowSelect = (flow) => {
        setSelectedFlow(flow);
        navigate('/graph');  // Redirect to graph view
    };

    return (
        <div className="flow-list-container">
            <h2>Available Flows</h2>

            {/* Display loading indicator */}
            {loading && <p>Loading flows...</p>}

            {/* Display error message if there's an error */}
            {error && <p>{error}</p>}

            {/* Display flows list if not loading and no error */}
            {!loading && !error && (
                <ul>
                    {flows.map(flow => (
                        <li key={flow.id} onClick={() => handleFlowSelect(flow.nodes)}>
                            {flow.name}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default FlowList;
