import React, { useState, useEffect } from 'react';
import './WeeklyReview.css';

const WeeklyReview = () => {
    const [isLoading, setIsLoading] = useState(false); // 분석 중 여부 상태
    const [isVisible, setIsVisible] = useState(false); // 분석 완료 후 이미지 표시 여부 상태
    const [isReviewStarted, setIsReviewStarted] = useState(false); // 리뷰 시작 여부 상태
    const [isAvailable, setIsAvailable] = useState(true); // 가용성 상태 (월요일 9시 이전엔 비활성화)

    // 월요일 오전 9시 이전에는 AI 주간보고 생성 비활성화
    useEffect(() => {
        const checkAvailability = () => {
            const now = new Date();
            const day = now.getDay(); // 0: 일요일, 1: 월요일, ..., 6: 토요일
            const hour = now.getHours();
            const minute = now.getMinutes();

            // 월요일 00시부터 오전 9시까지는 disabled-box
            if (day === 1 && (hour < 9 || (hour === 9 && minute === 0))) {
                setIsAvailable(false);
            } else {
                setIsAvailable(true); // 그 외 시간은 enabled-box
            }
        };

        checkAvailability(); // 컴포넌트가 마운트될 때 가용성 체크
        const interval = setInterval(checkAvailability, 60000); // 1분마다 가용성 확인

        return () => clearInterval(interval); // 언마운트 시 interval 정리
    }, []);

    // 외부 스크립트 로드 (dotlottie)
    useEffect(() => {
        const script = document.createElement('script');
        script.src = "https://unpkg.com/@dotlottie/player-component@2.7.12/dist/dotlottie-player.mjs";
        script.type = "module";
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    // 리뷰 시작 버튼 클릭 시 실행되는 함수
    const startReview = () => {
        setIsReviewStarted(true); // 리뷰 시작 상태로 변경
        setIsLoading(true); // 로딩 시작

        // 5초 후에 분석 완료 상태로 전환
        const loadingTimer = setTimeout(() => {
            setIsLoading(false); // 분석 완료 상태로 변경

            // 분석 완료 화면이 뜬 1초 후 이미지 표시
            setTimeout(() => {
                setIsVisible(true); // 분석 완료 후 이미지 표시
            }, 1000);
        }, 5000);

        return () => clearTimeout(loadingTimer);
    };

    const handleClick = () => {
        window.location.href = '/weeklyreport'; // '/weeklyreport' 페이지로 이동
    };

    return (
        <div className="weekly-review-container">
            <div className="review-box">
                {!isAvailable ? (
                    // 월요일 오전 9시 이전에는 disabled-box 표시
                    <div className="disabled-box">
                        <div className="icon-container">
                            <span className="clock-icon" role="img" aria-label="Clock">🕒</span>
                        </div>
                        <p className="text">AI 주간보고 생성은 <br /> 매주 월요일 9시부터 가능합니다.</p>
                    </div>
                ) : (
                    // 월요일 오전 9시 이후에는 enabled-box 표시
                    !isReviewStarted && (
                        <div className="enabled-box" >
                            <div className="icon-container">
                                <dotlottie-player
                                    src="https://lottie.host/714f7cda-7a3d-47fa-8296-caf5ae946051/Sh7fIYjs1a.json"
                                    background="transparent"
                                    speed="1.5"
                                    className="lottie-player-before"
                                    autoplay
                                    loop={false}
                                ></dotlottie-player>
                            </div>
                            <p className="text">지난주에 작성하신 일기에 대해 <br /> AI 분석을 실시해보세요.</p>
                            <button className="generate-button" onClick={startReview}>AI 주간보고 생성</button>
                        </div>
                    )
                )}
            </div>

            {isReviewStarted && (
                // AI 분석 생성 후 로딩 화면 및 분석 완료 화면
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
                                <p className="subheading">AI 주간보고를 생성중입니다. <br /> 잠시만 기다려주세요!</p>
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
            )}
        </div>
    );
};

export default WeeklyReview;
