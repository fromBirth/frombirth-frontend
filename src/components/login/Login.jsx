/* src/components/login/Login.jsx */

import './Login.css'
import kakaoSymbol from '../../assets/img/kakaoSymbol.svg'
import { Link,useNavigate } from "react-router-dom";
import {useEffect, useContext,useState} from "react";
import AppContext from '../../contexts/AppProvider.jsx';
import Cookies from 'js-cookie';
import {CHILDREN_LIST_BY_USER, SPRING_BASE_URL} from "../../routes/ApiPath.js";
import axios from "axios";

function Login() {
    const navigate = useNavigate();
    const { setUser,setChildList ,setIsLoading,setSelectedChildId} = useContext(AppContext); // 사용자 정보 설정을 위한 Context 사용
    const [isFetching, setIsFetching] = useState(false);
    async function fetchProtectedData(retryCount = 0) {
        if (retryCount > 1) {
            console.error('Max retry attempts reached');
            return;
        }
        try {
            const response = await fetch(SPRING_BASE_URL + '/api/user/me', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });

            if (response.ok) {
                const data = await response.json();
                console.log('User data:', data);
                console.log('Login successful', data);
                setUser({
                    userId: data.userId,
                    email: data.email,
                });
                console.log("1");

                // fetchChildList의 비동기 작업이 완료될 때까지 대기
                console.log("2");
                try {
                    const result = await axios.get(CHILDREN_LIST_BY_USER + data.userId);
                    console.log("3");
                    setChildList(result.data);
                    saveChildId(result.data);
                } catch (error) {
                    console.error("아이 리스트 가져오는 중 오류가 발생했습니다.", error);
                }

                let newaccessToken = Cookies.get('accessToken');
                let newrefreshToken = Cookies.get('refreshToken');
                if (window.Android) {
                    window.Android.receiveTokens(newaccessToken, newrefreshToken);
                }

                // fetchChildList 완료 후에 navigate 호출
                navigate("/dashboard");

            } else if (response.status === 401) {
                await refreshToken();
                await fetchProtectedData(retryCount + 1);
            } else {
                throw new Error('Unauthorized');
            }
        } catch (error) {
            console.error('Error:', error);
            // 에러 처리 로직 추가
        }
    }



    const saveChildId = (childList) => {
        if (childList.length < 1) return;
        console.log(childList);
        console.log(localStorage.getItem('selectedChildId'));

        const isUserChild = childList.find((item) => item.childId === Number(localStorage.getItem('selectedChildId')));
        console.log('isUserChild : ', isUserChild);

        if (isUserChild) {
            setSelectedChildId(isUserChild.childId);
        }

        if (!localStorage.getItem('selectedChildId') || !isUserChild) {
            const lastChildId = childList[childList.length - 1]?.childId;
            if (lastChildId) {
                setSelectedChildId(lastChildId);
                localStorage.setItem('selectedChildId', lastChildId);
            }
        }
    };

// 리프레시 토큰을 사용하여 새로운 액세스 토큰 요청
    function refreshToken() {
        // 기존 accessToken 쿠키 삭제
        Cookies.remove('accessToken', { path: '/' });
        return fetch(SPRING_BASE_URL + '/auth/refresh', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include', // 쿠키를 포함하여 요청
        })
            .then(response => {
                if (response.ok) {
                    return response.text(); // 응답이 텍스트 형식일 경우
                } else {
                    throw new Error('Refresh token invalid or expired');
                }
            })
            .then(text => {
                if (text.startsWith('{')) {
                    // 응답이 JSON이라면 JSON으로 파싱
                    const data = JSON.parse(text);



                } else {
                    console.log(text); // 응답이 텍스트인 경우 그대로 로그에 출력
                }
                console.log('Access token refreshed and stored');
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
        if (accessToken && refreshToken && !isFetching) {
            setIsFetching(true); // 먼저 설정
            fetchProtectedData()
                .catch((error) => console.error("Fetch error:", error))
                .finally(() => setIsFetching(false)); // 마지막에 재설정
        }

    }, [isFetching]);


    const handleKakaoLogin = () => {
        window.Kakao.Auth.authorize({
            redirectUri: SPRING_BASE_URL+'/api/kakao/callback', // 리다이렉트 URI 설정
        });
    };

    return (
        <div className="login-wrap">
            <div className="logo-text">
                <p className="title">프롬버스</p>
                <p className="subtitle">from birth : 탄생부터 성장까지</p>
                <p className="description">육아 기록 및 발달장애 진단 앱</p>
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
