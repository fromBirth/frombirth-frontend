import React, { useEffect, useState } from 'react';
import './WeeklyReview.css';


const WeeklyReview = () => {
    const [isLoading, setIsLoading] = useState(true); // 분석 중 여부 상태
    const [isVisible, setIsVisible] = useState(false); // 이미지 표시 여부 상태

    useEffect(() => {
        const script = document.createElement('script');
        script.src = "https://unpkg.com/@dotlottie/player-component@2.7.12/dist/dotlottie-player.mjs";
        script.type = "module";
        document.body.appendChild(script);

        // 5초 후에 분석 완료 상태로 전환
        const loadingTimer = setTimeout(() => {
            setIsLoading(false); // 분석 완료로 상태 전환

            // 분석 완료 화면이 뜬 1초 후 이미지 표시
            setTimeout(() => {
                setIsVisible(true);
            }, 1000);
        }, 5000);

        return () => {
            document.body.removeChild(script);
            clearTimeout(loadingTimer);
        };
    }, []);
    const handleClick = () => {
        window.location.href = '/weeklyreport'; // '/weeklyreport' 페이지로 이동
    };


    return (
        <>
        <div className="date-range">2024년 10월 3주<br/>2024.10.14 (월) ~ 2024.10.14 (월)</div>
    <div>
        {isLoading && (
            // "분석중" 화면 - 5초 후 사라짐
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
                        <p className="subheading">AI 주간보고를 생성중입니다. <br/> 잠시만 기다려주세요!</p>
                    </div>
                </div>
            )}

            {!isLoading && (
                // "분석완료" 화면 - 5초 후 나타남
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
                        <button className="action-button" onClick={handleClick} >확인하기</button>
                    </div>
                </div>
            )}
        </div>
        </>
    );
};

export default WeeklyReview;
