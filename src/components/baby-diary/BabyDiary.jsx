/* src/components/baby-diary/BabyDiary.jsx */

import Calendar from "./diary-calendar/DiaryCalendar.jsx";
import './BabyDiary.css';
import { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { PATHS } from "../../routes/paths.js";
import { getDiaryByDate } from "./DiaryCommonFunction.js"; // 날짜 기반 함수 임포트
import AppContext from "../../contexts/AppProvider.jsx";
import {debounce} from "lodash";

const BabyDiary = () => {
    const navigate = useNavigate();
    const { date: dateParam } = useParams(); // URL에서 date 파라미터 가져오기
    const { selectedChildId } = useContext(AppContext); // AppContext에서 childId 가져오기
    const [diaryData, setDiaryData] = useState(null); // 서버에서 가져온 일기 데이터를 저장할 상태
    const [loading, setLoading] = useState(true); // 로딩 상태

    // 오늘 날짜를 가져오는 함수
    const getTodayDate = () => {
        const today = new Date();
        return today.toISOString().split('T')[0]; // YYYY-MM-DD 형식으로 반환
    };

    // 요일을 가져오는 함수
    const getDayOfWeek = (dateString) => {
        const date = new Date(dateString);
        const days = ["일", "월", "화", "수", "목", "금", "토"];
        return days[date.getDay()];
    };

    const [date, setDate] = useState(dateParam || getTodayDate());

    useEffect(() => {
        // 날짜에 따라 일기 데이터를 불러오는 함수
        const fetchDiaryData = async () => {
            if (selectedChildId && date) {
                try {
                    setLoading(true);
                    const diary = await getDiaryByDate(selectedChildId, date);
                    setDiaryData(diary);
                } catch (error) {
                    console.error("일기 데이터를 불러오는 중 오류 발생:", error);
                } finally {
                    setLoading(false);
                }
            }
        };

        // debounce를 사용하여 fetchDiaryData 함수를 지연 호출
        const debouncedFetchDiaryData = debounce(fetchDiaryData, 3000); // 3000ms 대기 시간

        debouncedFetchDiaryData();

        return () => {
            // 컴포넌트가 언마운트되거나 `selectedChildId` 또는 `date`가 변경될 때 debounce 호출 취소
            debouncedFetchDiaryData.cancel();
        };
    }, [selectedChildId, date]);

    const dayOfWeek = getDayOfWeek(date);

    // 일기 작성 버튼 클릭 시 실행되는 함수
    const handleWriteDiary = () => {
        setTimeout(() => {
            navigate(`${PATHS.BABY_DIARY.WRITE}/${date}`);
        }, 200);
    };

    // 일기 내용 클릭 시 실행되는 함수
    const handleViewDiary = () => {
        setTimeout(() => {
            if (diaryData) {
                navigate(PATHS.BABY_DIARY.VIEW, { state: diaryData });
            }
        }, 200);
    };

    // 이미지 URL 유효성 검사 함수
    const isValidImageUrl = (url) => {
        // URL이 null이 아니고, "null" 문자열을 포함하지 않을 때 유효
        return url && !url.toLowerCase().includes("null");
    };

    return (
        <div className="diary-container">
            {/* 날짜를 클릭할 때 선택된 날짜를 설정하는 setDate를 전달 */}
            <Calendar onDateClick={(clickedDate) => setDate(clickedDate)} />
            <div className="diary-wrap">
                <div className="diary-content">
                    <div className="date">{`${date} (${dayOfWeek})`}</div>
                </div>
                {loading ? (
                    <div className="loading-spinner">
                        <div className="spinner"></div>
                    </div>
                ) : diaryData ? (
                    <div className="diary-content" onClick={handleViewDiary}>
                        <div className="title">{diaryData.title}</div>
                        <p className="text">{diaryData.content}</p>
                        {diaryData.images && diaryData.images.length > 0 && (
                            <div className="images">
                                {diaryData.images
                                    .filter((img) => isValidImageUrl(img.url)) // 유효한 URL만 필터링
                                    .map((img, index) => (
                                        <img key={index} src={img.url} alt={`Diary Image ${index + 1}`} />
                                    ))}
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="no-content">
                        <div className="message">아직 작성된 일기가 없어요.</div>
                        <button onClick={handleWriteDiary}>
                            일기 작성하기<i className="bi bi-chevron-right"></i>
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BabyDiary;
