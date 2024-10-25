// src/pages/Main.jsx
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext.jsx';
import './main.css'

function Main() {
    const { isAuthenticated, toggleAuth } = useContext(AuthContext);

    return (
        <div>
            <h1>Home Page</h1>
            <p>{isAuthenticated ? 'You are logged in!' : 'You are not logged in.'}</p>
            <button onClick={toggleAuth}>
                {isAuthenticated ? 'Log out' : 'Log in'}
            </button>
        </div>
    );
}

export default Main;
