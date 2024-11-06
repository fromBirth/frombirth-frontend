import React, { useEffect, useState } from 'react';
import './ReviewWaiting.css';

const ReviewWaiting = () => {
    const [isAvailable, setIsAvailable] = useState(false);

    useEffect(() => {
        const script = document.createElement('script');
        script.src = "https://unpkg.com/@dotlottie/player-component@2.7.12/dist/dotlottie-player.mjs";
        script.type = "module";
        document.body.appendChild(script);
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

    const handleClick = () => {
        window.location.href = '/weeklyreview'; // '/weeklyreview' 페이지로 이동
    };

    return (
        <div className="weekly-review-container">
            <div className="review-box">
                {!isAvailable ? (
                    <div className="disabled-box">
                        <div className="icon-container">
                            <span className="clock-icon" role="img" aria-label="Clock">🕒</span>
                        </div>
                        <p className="text">AI 주간보고 생성은 <br /> 매주 월요일 9시부터 가능합니다.</p>
                    </div>
                ) : (
                    <div className="enabled-box" onClick={handleClick}>
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
                        <p className="text">지난주에 작성하신 일기에 대해 <br/> AI 분석을 실시해보세요.</p>
                        <button className="generate-button">AI 주간보고 생성</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ReviewWaiting;
