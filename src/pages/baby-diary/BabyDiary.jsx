import './baby-diary.css'
import { useEffect, useState } from "react";
import axios from "axios";

function BabyDiary() {
    const [message, setMessage] = useState("");

    useEffect(() => {
        // Spring Boot 서버의 API 호출
        axios.get("/api/test")
            .then(response => {
                setMessage(response.data); // 서버에서 받은 메시지 설정
            })
            .catch(error => {
                console.error("API 호출 에러:", error);
                setMessage("Spring Boot 서버와 연결 실패!");
            });
    }, []);

    return (
        <div>
            <h1>서버 연결 테스트</h1>
            <p>{message}</p> {/* 서버에서 받은 메시지 출력 */}
        </div>
    );
}

export default BabyDiary;
