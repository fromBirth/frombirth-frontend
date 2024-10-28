import React, {useEffect, useState} from 'react';
import './BabyDiary.css';
import axios from "axios";
import Calendar from "./diary-calendar/DiaryCalendar.jsx";

const BabyDiary = () => {
    // const [message, setMessage] = useState("");

    // useEffect(() => {
    //     // Spring Boot 서버의 API 호출
    //     axios.get("/api/test")
    //         .then(response => {
    //             setMessage(response.data); // 서버에서 받은 메시지 설정
    //         })
    //         .catch(error => {
    //             console.error("API 호출 에러:", error);
    //             setMessage("Spring Boot 서버와 연결 실패!");
    //         });
    // }, []);

    return (
        <div className="container">
            {/*<div>*/}
            {/*    <h1>서버 연결 테스트</h1>*/}
            {/*    <p>{message}</p> /!* 서버에서 받은 메시지 출력 *!/*/}
            {/*</div>*/}
            <div className="header">
                <img src="profile-placeholder.png" alt="Profile Picture"/>
                <div>
                    <h2>홍길동 - 0개월 12일 (만 0세)</h2>
                    <span>▼</span>
                </div>
                <div style={{marginLeft: 'auto'}}>
                    <span>🔍 ⋮</span>
                </div>
            </div>
            <Calendar/>

            {/*<div className="calendar-nav">*/}
            {/*    <span>◀</span>*/}
            {/*    <span>2024.10</span>*/}
            {/*    <span>▶</span>*/}
            {/*</div>*/}

            {/*<div className="calendar">*/}
            {/*    <div>일</div>*/}
            {/*    <div>월</div>*/}
            {/*    <div>화</div>*/}
            {/*    <div>수</div>*/}
            {/*    <div>목</div>*/}
            {/*    <div>금</div>*/}
            {/*    <div>토</div>*/}

            {/*    <div></div>*/}
            {/*    <div></div>*/}
            {/*    <div className="highlighted"><img src="avatar1.png" alt="Avatar"/></div>*/}
            {/*    <div><img src="avatar2.png" alt="Avatar"/></div>*/}
            {/*    <div></div>*/}
            {/*    <div></div>*/}
            {/*    <div></div>*/}
            {/*    <div><img src="avatar3.png" alt="Avatar"/></div>*/}
            {/*    <div></div>*/}
            {/*    <div><img src="avatar4.png" alt="Avatar"/></div>*/}
            {/*    <div></div>*/}
            {/*    <div className="highlighted">11</div>*/}
            {/*    <div><img src="avatar5.png" alt="Avatar"/></div>*/}
            {/*    <div></div>*/}
            {/*    /!* Add empty slots or more dates/images as necessary *!/*/}
            {/*</div>*/}

            <div className="diary-entry">
                <h3>10.11 첫 이유식 도전!</h3>
                <p className="diary-text">오늘 드디어 아기 이유식을 시작했다. 쌀미음을 준비해서 작은 숟가락에 떠서 줬는데, 처음엔 어리둥절하더니 이내 찝찝거리면서 잘 먹었다.
                    얼굴에 이유식을 잔뜩 묻히면서도 열심히 먹는 모습이 너무 귀여웠다. 아직은 양이 적...</p>
                <div className="diary-images">
                    <img src="food1.png" alt="Food Image"/>
                    <img src="food2.png" alt="Food Image"/>
                    <img src="food3.png" alt="Food Image"/>
                    <img src="food4.png" alt="Food Image"/>
                </div>
            </div>
        </div>
    );
};

export default BabyDiary;