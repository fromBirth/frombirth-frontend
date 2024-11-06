import {useState, useContext, useEffect} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../contexts/AppProvider';
import { PATHS } from '../../routes/paths.js';
import { SPRING_BASE_URL } from '../../routes/ApiPath.js';
import Cookies from 'js-cookie';

function TestLogin() {
    const [userId, setUserId] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { setUser } = useContext(AppContext); // 사용자 정보 설정을 위한 Context 사용
    const [isFetching, setIsFetching] = useState(false);
    function fetchProtectedData(retryCount = 0) {
        if (retryCount > 1) { // 최대 재시도 횟수 제한
            console.error('Max retry attempts reached');
            return;
        }
        return fetch(SPRING_BASE_URL+'/api/user/me', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include', // 쿠키를 포함하여 요청
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else if (response.status === 401) {
                    // 액세스 토큰이 유효하지 않으면 리프레시 토큰으로 갱신 시도
                    return refreshToken().then(() => fetchProtectedData(retryCount + 1));
                } else {
                    throw new Error('Unauthorized');
                }
            })
            .then(data => {
                console.log('User data:', data);
                console.log('Login successful', data);
                // 필요 시 사용자 정보를 상태에 저장하거나 추가 동작 수행
                setUser({
                    userId: data.userId,
                    email: data.email
                });
                let newaccessToken = Cookies.get('accessToken');
                let newrefreshToken = Cookies.get('refreshToken');
                if (window.Android) {
                    window.Android.receiveTokens(newaccessToken, newrefreshToken);
                }
                // 메인 페이지로 이동
                navigate("/");
            })
            .catch(error => {
                console.error('Error:', error);
                // 로그인 페이지로 리디렉션 등 처리
            });
    }

// 리프레시 토큰을 사용하여 새로운 액세스 토큰 요청
    function refreshToken() {
        return fetch(SPRING_BASE_URL+'/auth/refresh', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include', // 쿠키를 포함하여 요청
        })
            .then(response => {
                if (response.ok) {
                    console.log('Access token refreshed');
                } else {
                    throw new Error('Refresh token invalid or expired');
                }
            })
            .catch(error => {
                console.error('Refresh token error:', error);
                // 로그인 페이지로 리디렉션
            });
    }
    useEffect(() => {
        if (window.Kakao && !window.Kakao.isInitialized()) {
            window.Kakao.init('66231e0e83f9f6009c0eb6c52aadb80b');
        }

        // URL 파라미터에서 토큰 및 사용자 정보 추출
        let accessToken = Cookies.get('accessToken');
        let refreshToken = Cookies.get('refreshToken');
        if (window.Android) {
            window.Android.receiveTokens(accessToken, refreshToken);
        }
        // 토큰이 존재하는 경우 백엔드로 검증 요청
        if (accessToken && refreshToken ) {
            fetchProtectedData().finally(() => setIsFetching(true));
        }
    }, [isFetching]);





    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        // 백엔드의 /auth/test-login 엔드포인트로 POST 요청 보내기
        window.location.href = `${SPRING_BASE_URL}/auth/test-login?userId=${userId}`;
    };




    return (
        <div className="test-login-container">
            <h2>테스트 로그인</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="userId">User ID:</label>
                    <input
                        type="text"
                        id="userId"
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                        required
                        placeholder="Enter your User ID"
                    />
                </div>
                <button type="submit">로그인</button>
            </form>
            {error && <p className="error-message">{error}</p>}
        </div>
    );
}

export default TestLogin;
