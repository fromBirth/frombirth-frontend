/* src/components/login/Login.jsx */

import './Login.css'
import kakaoSymbol from '../../assets/img/kakaoSymbol.svg'
import { Link } from 'react-router-dom';
import {useEffect} from "react";

function Login() {

    useEffect(() => {
        if (window.Kakao && !window.Kakao.isInitialized()) {
            window.Kakao.init('66231e0e83f9f6009c0eb6c52aadb80b');
        }
    }, []);

    const handleKakaoLogin = () => {
        window.Kakao.Auth.authorize({
            redirectUri: 'http://localhost:8181/api/kakao/callback', // 리다이렉트 URI 설정
        });
    };

    return (
        <div className="login-wrap">
            <div className="logo-text">
                <p className="title">프롬버스</p>
                <p className="subtitle">from birth : 탄생부터 성장까지</p>
                <p className="description">육아 기록 및 발달장애 진단 앱</p>
                <Link
                    to="/"
                    style={{
                        fontSize: '12px',
                        color: 'gray',
                        position: 'absolute',
                        top: '10px',
                        right: '10px',
                    }}
                >
                    메인으로
                </Link>
            </div>
            <button onClick={handleKakaoLogin}>
                <div className="kakao-button">
                    <img src={kakaoSymbol} alt="KaKaoLoginImg" />
                    <span>카카오로 시작하기</span>
                </div>
            </button>
        </div>
    );
}

export default Login;
