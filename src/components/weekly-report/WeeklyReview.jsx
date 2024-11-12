import React, {useState, useEffect, useContext} from 'react';
import './WeeklyReview.css';
import {PATHS} from "../../routes/paths.js";
import {useNavigate} from "react-router-dom";


const WeeklyReview = () => {
    const [isLoading, setIsLoading] = useState(true); // 처음에 isLoading을 true로 설정
    const [isVisible, setIsVisible] = useState(false); // 분석 완료 후 이미지 표시 여부 상태
    const navigate = useNavigate();
    const urlParams = new URLSearchParams(location.search);
    const reportId = urlParams.get("reportId");

    useEffect(() => {
        const script = document.createElement('script');
        script.src = "https://unpkg.com/@dotlottie/player-component@2.7.12/dist/dotlottie-player.mjs";
        script.type = "module";
        document.body.appendChild(script);

        // 5초 후에 isLoading을 false로 설정
        const timer = setTimeout(() => {
            setIsLoading(false);

            // 1초 뒤에 setIsVisible을 true로 설정하여 이미지가 서서히 나타나도록 설정
            setTimeout(() => {
                setIsVisible(true);  // 1초 후에 setIsVisible(true)
            }, 1000); // 1초 뒤에 실행
        }, 5000); // 5초 후에 isLoading을 false로 설정

        // cleanup: 컴포넌트가 언마운트될 때 타이머 정리
        return () => {
            clearTimeout(timer);
            document.body.removeChild(script);
        };
    }, []); // 빈 배열을 사용하여 컴포넌트 마운트 시에만 실행




    const handleClick = () => {
        navigate(`${PATHS.WEEKLY_REPORT.MAIN}?reportId=${reportId}`);
    };

    return (
        <div className="weekly-review-container">
            <div>
                {isLoading && (
                    // "분석중" 화면 - 5초 동안 표시
                    <div className="animation-before-container">
                        <dotlottie-player
                            src="https://lottie.host/e8f565b5-614b-4df1-93b4-69ea3dacf7b8/heX9dTmYtK.json"
                            background="transparent"
                            speed="1.5"
                            className="lottie-player-before"
                            autoplay
                            loop
                        ></dotlottie-player>

                        {/* 분석중 이미지 */}
                        <img
                            src="/src/assets/img/baby.png"
                            alt="Baby Loading"
                            className="baby-before-image"
                        />

                        {/* "분석중" 텍스트 */}
                        <div className="text-before-container loading-text">
                            <h3 className="heading">AI 분석중</h3>
                            <p className="subheading">AI 주간보고를 생성중입니다. <br /> 잠시만 기다려주세요!</p>
                        </div>
                    </div>
                )}

                {!isLoading && (
                    // "분석완료" 화면 - isLoading이 false일 때 표시
                    <div className="animation-container fade-in">
                        <dotlottie-player
                            src="https://lottie.host/4fecb26b-0f58-4aad-8670-b269ce580153/WnHWwsFr3b.json"
                            background="transparent"
                            speed="1.5"
                            className="lottie-player"
                            autoplay
                            loop={false}
                        ></dotlottie-player>

                        {/* 분석완료 이미지 */}
                        <img
                            src="/src/assets/img/baby_face3.png"
                            alt="Baby Complete"
                            className={`baby-image ${isVisible ? 'visible' : ''}`}
                        />

                        {/* "분석완료" 텍스트 및 버튼 */}
                        <div className={`text-container ${isVisible ? 'fade-in' : 'fade-out'}`}>
                            <h3 className="heading">AI 분석완료</h3>
                            <p className="subheading">생성된 AI주간보고를 확인해보세요.</p>
                            <button className="action-button" onClick={handleClick}>확인하기</button>
                        </div>
                    </div>
                )}
            </div>
        </div>


    );
};

export default WeeklyReview;
