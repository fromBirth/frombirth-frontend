import './Login.css'
import kakaoSymbol from '../../assets/img/kakaoSymbol.svg'
import {useEffect} from "react";

function Login() {

    useEffect(() => {
        if (window.Kakao && !window.Kakao.isInitialized()) {
            window.Kakao.init('519ba2250d60f42ba1773ab9a6c41eb5');
        }
    }, []);

    const handleKakaoLogin = () => {
        window.Kakao.Auth.authorize({
            redirectUri: 'http://172.30.1.18:8181/api/kakao/callback', // 리다이렉트 URI 설정
        });
    };

    return (
        <div className="wrap">
            <div className="logo-text">
                <p className="title dunggeunmiso-b">프롬버스</p>
                <p className="subtitle dunggeunmiso-b">from birth : 탄생부터 성장까지</p>
                <p className="description dunggeunmiso-r">육아 기록 및 발달장애 진단 앱</p>
            </div>
            <button onClick={handleKakaoLogin}>
                <div className="kakao-button">
                    <img src={kakaoSymbol} alt="KaKaoLoginImg"
                         style={{width: '6vw', height: 'auto', marginRight: '2vw'}}/>
                    <span className="pretendard-bold">카카오로 시작하기</span>
                </div>
            </button>
        </div>
    );
}

export default Login;
