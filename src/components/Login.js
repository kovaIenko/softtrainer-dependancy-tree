import React, {useState} from 'react';
import axios from 'axios';

const Login = ({setToken}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async () => {
        try {
            const serverUrl = "https://api.thesofttrainer.com" //process.env.REACT_APP_SERVER_URL;
            const response = await axios.post(serverUrl + '/login', {username, password});
            setToken(response.data.token); // Save token to App state
            window.location.href = '/flows'; // Redirect to flow list
        } catch (error) {
            setError('Invalid username or password');
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <input
                type="text"
                placeholder="Username"
                value={username}
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
