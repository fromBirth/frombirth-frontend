import './WeeklyReport.css';
import KakaoMap from "../kakao-map/KakaoMap";
import ProgressBar from "../ProgressBar/ProgressBar";
import React, { useEffect, useState } from "react";
import axios from 'axios'; // axios 사용
import { REPORT_CHILD_ALL_REPORT, REPORT_CHILD_REPORT } from '../../routes/ApiPath.js';
import prev from '../../assets/img/prev-button.png';
import next from '../../assets/img/next-button.png';

// 주간 날짜 범위 계산 함수
const getWeekRange = (date) => {
    const dayOfWeek = date.getDay(); // 일요일=0, 월요일=1, ..., 토요일=6
    const diffToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek; // 일요일이면 -6, 월요일이면 1, ...
    const startOfWeek = new Date(date);
    startOfWeek.setDate(date.getDate() + diffToMonday); // 월요일 날짜 구하기

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6); // 일요일 날짜 구하기

    // 형식화된 날짜 (YYYY.MM.DD 형식으로 반환)
    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}.${month}.${day}`;
    };

    return {
        start: formatDate(startOfWeek),
        end: formatDate(endOfWeek),
    };
};

const getDayName = (date) => {
    const daysOfWeek = ["일", "월", "화", "수", "목", "금", "토"];
    return daysOfWeek[date.getDay()];
};

const WeeklyReport = () => {
    const [isAvailable, setIsAvailable] = useState(true); // 가용성 상태 (월요일 9시 이전엔 비활성화)
    const [isDataAvailable, setIsDataAvailable] = useState(true); // 데이터 가용성 상태
    const [selectedReport, setSelectedReport] = useState(null); // 선택된 보고서 상태
    const [reports, setReports] = useState([]); // 보고서 리스트 상태
    const [weekRange, setWeekRange] = useState(""); // 주간 날짜 범위 상태
    const [currentReportIndex, setCurrentReportIndex] = useState(null); // 현재 선택된 보고서 인덱스
    const childId = 56; // 예시 childId (실제로는 부모 컴포넌트에서 이 값을 전달하거나 컨텍스트로 관리할 수 있음)

    // 월요일 오전 9시 이후인지 체크하는 함수
    const checkIfAvailable = () => {
        const now = new Date();
        const dayOfWeek = now.getDay();
        const hour = now.getHours();
        if (dayOfWeek === 1 && hour >= 9) {
            setIsAvailable(true); // 월요일 9시 이후
        } else if (dayOfWeek > 1 || (dayOfWeek === 1 && hour < 9)) {
            setIsAvailable(false); // 월요일 9시 전이나 다른 요일
        }
    };

    useEffect(() => {
        checkIfAvailable(); // 월요일 9시 여부 확인

        // 데이터가 없을 때, getAllReports API 호출하여 데이터 불러오기
        const fetchReports = async () => {
            try {
                const response = await axios.get(`${REPORT_CHILD_ALL_REPORT}/${childId}`);
                console.log("response.data:", response.data); // 응답 데이터 전체를 확인합니다.

                if (Array.isArray(response.data) && response.data.length > 0) {
                    console.log("reports:", response.data); // 실제 reports 배열 내용 확인

                    // reports를 상태에 설정하고, 최신 보고서부터 역순으로 정렬
                    const sortedReports = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                    setReports(sortedReports);

                    // 가장 최신 보고서를 선택
                    const latestReport = sortedReports[0];
                    setSelectedReport(latestReport);
                    setCurrentReportIndex(0); // 현재 선택된 보고서 인덱스 설정

                    // 주간 날짜 범위 계산 및 설정
                    const createdAt = new Date(latestReport.createdAt);
                    const { start, end } = getWeekRange(createdAt);
                    setWeekRange(`${createdAt.getFullYear()}년 ${createdAt.getMonth() + 1}월 <br/> ${start} (${getDayName(new Date(start))}) ~ ${end} (${getDayName(new Date(end))})`);
                } else {
                    console.error("보고서가 없습니다.");
                    setIsDataAvailable(false);
                }
            } catch (error) {
                console.error("데이터를 불러오는 데 실패했습니다:", error);
                setIsDataAvailable(false);
            }
        };

        fetchReports(); // 컴포넌트 마운트 시에 데이터 불러오기
    }, [childId]);

    // 선택된 보고서를 불러오는 함수
    const fetchReportById = async (reportId) => {
        try {
            const response = await axios.get(`${REPORT_CHILD_REPORT}/${reportId}`);
            setSelectedReport(response.data); // 선택된 보고서 데이터 설정
        } catch (error) {
            console.error("보고서를 불러오는 데 실패했습니다:", error);
        }
    };

    // 이전 보고서로 이동하는 함수
    const loadPreviousReport = () => {
        if (currentReportIndex < reports.length - 1) { // 현재 보고서보다 과거 보고서로 이동
            const previousReport = reports[currentReportIndex + 1];
            setSelectedReport(previousReport); // 이전 보고서로 업데이트
            setCurrentReportIndex(currentReportIndex + 1); // 인덱스 업데이트

            // 이전 보고서 기준으로 주간 범위 업데이트
            const createdAt = new Date(previousReport.createdAt);
            const { start, end } = getWeekRange(createdAt);
            setWeekRange(`${createdAt.getFullYear()}년 ${createdAt.getMonth() + 1}월 <br/> ${start} (${getDayName(new Date(start))}) ~ ${end} (${getDayName(new Date(end))})`);
        }
    };

    // 다음 보고서로 이동하는 함수
    const loadNextReport = () => {
        if (currentReportIndex > 0) { // 현재 보고서보다 최신 보고서로 이동
            const nextReport = reports[currentReportIndex - 1];
            setSelectedReport(nextReport); // 다음 보고서로 업데이트
            setCurrentReportIndex(currentReportIndex - 1); // 인덱스 업데이트

            // 다음 보고서 기준으로 주간 범위 업데이트
            const createdAt = new Date(nextReport.createdAt);
            const { start, end } = getWeekRange(createdAt);
            setWeekRange(`${createdAt.getFullYear()}년 ${createdAt.getMonth() + 1}월 <br/> ${start} (${getDayName(new Date(start))}) ~ ${end} (${getDayName(new Date(end))})`);
        }
    };

    // 리뷰 시작 버튼 클릭 시 실행되는 함수
    const startReview = () => {
        window.location.href = "/weeklyreview"; // 리뷰 페이지로 이동
    };

    return (
        <>
            <div className="week-button">
                {/* 이전 보고서로 이동 버튼 */}
                <button
                    className="previous-week-button"
                    onClick={loadPreviousReport}
                    style={{ visibility: currentReportIndex < reports.length - 1 ? 'visible' : 'hidden' }}
                >
                    <img src={prev} style={{ width: '38px', height: '30px' }} alt="prev" />
                </button>

                <div className="date-range" dangerouslySetInnerHTML={{ __html: weekRange }}></div> {/* 동적으로 계산된 주간 날짜 범위 */}

                {/* 다음 보고서로 이동 버튼 */}
                <button
                    className="next-week-button"
                    onClick={loadNextReport}
                    style={{ visibility: currentReportIndex > 0 ? 'visible' : 'hidden' }}
                >
                    <img src={next} style={{ width: '38px', height: '30px' }} alt="next" />
                </button>
            </div>

            {/* 데이터가 없으면 review-box를 보여주고, 그렇지 않으면 기존의 report-content 등을 보여줌 */}
            {isDataAvailable ? (
                <div>
                    <div className="report-content">
                        {/* 피드백이 있으면 해당 피드백을 표시 */}
                        {selectedReport ? selectedReport.feedback : "피드백을 불러오는 중입니다..."}
                    </div>

                    <div className="analysis-section">
                        <h3>일기 분석 결과 위험성 정도</h3>
                        <div className="progress-bar">
                            <div className="low-risk"></div>
                            <div className="high-risk"></div>
                            {/* ProgressBar에 riskLevel * 20 값을 전달 */}
                            {selectedReport ? (
                                <ProgressBar value={selectedReport.riskLevel * 20} />
                            ) : (
                                <ProgressBar value={0} /> // 데이터가 없을 때는 0으로 기본값 설정
                            )}
                        </div>

                        <h3>영상분석 결과 위험성 정도</h3>
                        <div className="progress-bar">
                            <div className="low-risk"></div>
                            <div className="high-risk" style={{ width: '20%' }}></div>
                            <ProgressBar value={30} />
                        </div>
                    </div>

                    <div className="map-section">
                        <h3>근처 병원 정보</h3>
                        <KakaoMap />
                    </div>
                </div>
            ) : (
                <div className="review-box">
                    {!isAvailable ? (
                        <div className="disabled-box">
                            <div className="icon-container">
                                <span className="clock-icon" role="img" aria-label="Clock">🕒</span>
                            </div>
                            <p className="text">AI 주간보고 생성은 <br /> 매주 월요일 9시부터 가능합니다.</p>
                        </div>
                    ) : (
                        <div className="enabled-box">
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
                    )}
                </div>
            )}
        </>
    );
};

export default WeeklyReport;
