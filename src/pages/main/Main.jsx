// src/pages/Main.jsx
import {useEffect, useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext.jsx';
import './Main.css'

function Main() {
    const { isAuthenticated, toggleAuth } = useContext(AuthContext);
    useEffect(() => {
        if (window.Kakao && !window.Kakao.isInitialized()) {
            window.Kakao.init('66231e0e83f9f6009c0eb6c52aadb80b');
        }
    }, []);

    const handleKakaoLogin = () => {
        window.Kakao.Auth.authorize({
            redirectUri: 'https://your-redirect-url.com/kakaoLoginCallback', // 리다이렉트 URI 설정
        });
    };
    return (
        <div>
            <h1>Home Page</h1>
            <p>{isAuthenticated ? 'You are logged in!' : 'You are not logged in.'}</p>
            <button onClick={toggleAuth}>
                {isAuthenticated ? 'Log out' : 'Log in'}
            </button>
            <button onClick={handleKakaoLogin}>
                카카오톡으로 로그인
            </button>
        </div>
    );
}

export default Main;
