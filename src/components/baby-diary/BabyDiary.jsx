/* src/components/baby-diary/BabyDiary.jsx */

import Calendar from "./diary-calendar/DiaryCalendar.jsx";
import './BabyDiary.css';
import { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { PATHS } from "../../routes/paths.js";
import imageEx01 from '../../assets/img/imageEx01.png';
import imageEx02 from '../../assets/img/imageEx02.png';
import imageEx03 from '../../assets/img/imageEx03.png';
import imageEx04 from '../../assets/img/imageEx04.png';

const BabyDiary = () => {
    const navigate = useNavigate(); // 페이지 이동을 위한 useNavigate 훅
    const { date: dateParam } = useParams(); // URL에서 date 파라미터 가져오기

    // 오늘 날짜를 가져오는 함수
    const getTodayDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    // 요일을 가져오는 함수
    const getDayOfWeek = (dateString) => {
        const date = new Date(dateString);
        const days = ["일", "월", "화", "수", "목", "금", "토"];
        return days[date.getDay()];
    };

    // date 상태를 설정, URL에서 받아온 날짜가 없으면 오늘 날짜로 설정
    const [date, setDate] = useState(dateParam || getTodayDate());

    useEffect(() => {
        // URL에 날짜가 변경되거나 없는 경우, 상태를 업데이트
        setDate(dateParam || getTodayDate());
    }, [dateParam]);

    // 일기 작성 버튼 클릭 시 실행되는 함수
    const handleWriteDiary = () => {
        setTimeout(() => {
            navigate(`${PATHS.BABY_DIARY.WRITE}/${date}`);
        }, 200);
    };

    // 더미 데이터: 날짜에 맞는 일기 데이터가 있는지 확인
    const diaryData = {
        "2024-11-03": {
            title: "첫 이유식 도전!",
            content: "오늘 드디어 아기 이유식을 시작했다. 쌀미음을 준비해서 작은 숟가락에 떠서 줬는데, 처음엔 어리둥절하더니 이내 찝찝거리면서 잘 먹었다. 얼굴에 이유식을 잔뜩 묻히면서도 열심히 먹는 모습이 너무 귀여웠다.",
            images: [imageEx01, imageEx02],
        },
        "2024-11-05": {
            title: "공원 산책",
            content: "오늘은 가족들과 함께 공원으로 산책을 다녀왔다. 날씨가 정말 좋아서 아기도 기분이 좋아 보였다.",
            images: [imageEx03, imageEx04],
        }
    };

    const currentDiary = diaryData[date]; // 현재 선택된 날짜의 일기 데이터
    const dayOfWeek = getDayOfWeek(date); // 날짜에 맞는 요일 가져오기

    return (
        <div className="diary-container">
            <Calendar />

            <div className="diary-wrap">
                <div className="diary-content">
                    <div className="date">{`${date} (${dayOfWeek})`}</div> {/* 선택된 날짜와 요일 출력 */}
                </div>
                {currentDiary ? (
                    <div className="diary-content">
                        <div className="title">{currentDiary.title}</div>
                        <p className="text">{currentDiary.content}</p>
                        <div className="images">
                            {currentDiary.images.map((imgSrc, index) => (
                                <img key={index} src={imgSrc} alt={`Diary Image ${index + 1}`} />
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="no-content">
                        <div className="message">아직 작성된 일기가 없어요.</div>
                        <button onClick={handleWriteDiary}>일기 작성하기<i className="bi bi-chevron-right"></i></button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BabyDiary;
