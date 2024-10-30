import './BabyDiary.css';
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