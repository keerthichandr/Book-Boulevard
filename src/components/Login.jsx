import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import userLoggedIn from '../utils/userLoggedIn';
import "./Login.css"

const Login = () => {
    const { loggedInUser, setLogg, userInfo, setUserInfo } = useContext(userLoggedIn);

    // Pre-fill userId and password
    const [userid, setUserid] = useState('keerthi');
    const [password, setPassword] = useState('admin123');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        console.log("User info updated:", userInfo);
    }, [userInfo]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Reset the error message
        setIsLoading(true); // Start loading when the form is submitted

        console.log('Submitting form...'); // Log when the form is submitted
        try {
            const response = await fetch('https://vickyacharjee14.pythonanywhere.com/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userid, password }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json(); 

            if (data.message === "Login successful") {
                // Store user ID in local storage
                localStorage.setItem('userId', data.user.userid);  
                // Set the logged-in user and navigate
                setLogg(data.user.userid);
                navigate('/booksearch');
            } else {
                setError(data.message || 'Login failed. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error); // Log the error for debugging
            setError('Invalid user-name or password.');
        } finally {
            setIsLoading(false); // Stop loading regardless of the result
        }
    };

    return (
        <div className="login-wrapper">
            <h1 className='logo-text'>Book Boluevard</h1>
            <div className="login-container"> 
                <form className="form-login" style={{ textAlign: 'center', width: '17%', margin: '0 auto' }} onSubmit={handleSubmit}>
                    <div>
                        <input
                            className='width-100'
                            placeholder='User Id'
                            type="text"
                            value={userid}
                            onChange={(e) => setUserid(e.target.value)}
                            required
                            disabled={isLoading} // Disable input when loading
                        />
                    </div>
                    <div>
                        <input
                            className='width-100'
                            placeholder='Password'
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            disabled={isLoading} // Disable input when loading
                        />
                    </div>
                    <button className="login-btn" type="submit" disabled={isLoading}>
                        {isLoading ? 'Logging in...' : 'Login'}
                    </button>
                    {error && <p className='error-body'>{error}</p>}
                </form>
            </div>
            <footer className="footer">
              <span className='footer-credentials'>username: keerthi/john | password: admin123</span> <span className='footer-content'> @Book Boluevard 2024</span>
            </footer>
        </div>
    );
};

export default Login;
