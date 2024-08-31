import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import axios from 'axios';

const Login = ({setToken}) => {
    const [email, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate(); // Initialize useNavigate hook

    const handleLogin = async () => {
        try {
            const serverUrl = "https://api.thesofttrainer.com" //process.env.REACT_APP_SERVER_URL;
            const response = await axios.post(serverUrl + '/login', {email, password});
            localStorage.setItem('token', response.data.access_jwt_token); // Store token in localStorage
            setToken(response.data.access_jwt_token); // Save token to App state
            navigate('/flows'); // Redirect to flow list
        } catch (error) {
            setError('Invalid username or password');
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <input
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleLogin}>Login</button>
            {error && <p>{error}</p>}
        </div>
    );
};

export default Login;
