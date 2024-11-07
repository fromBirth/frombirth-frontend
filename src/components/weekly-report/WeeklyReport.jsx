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
    const [currentWeekStart, setCurrentWeekStart] = useState(null); // 현재 주 시작 날짜 (이용해서 이전 주로 이동)
    const childId = 56; // 예시 childId (실제로는 부모 컴포넌트에서 이 값을 전달하거나 컨텍스트로 관리할 수 있음)

    useEffect(() => {
        const script = document.createElement('script');
        script.src = "https://unpkg.com/@dotlottie/player-component@2.7.12/dist/dotlottie-player.mjs";
        script.type = "module";
        document.body.appendChild(script);
    }, []); // 빈 배열을 사용하여 컴포넌트 마운트 시에만 실행

    useEffect(() => {
        // 데이터가 없을 때, getAllReports API 호출하여 데이터 불러오기
        const fetchReports = async () => {
            try {
                const response = await axios.get(`${REPORT_CHILD_ALL_REPORT}/${childId}`);
                console.log("response.data:", response.data); // 응답 데이터 전체를 확인합니다.

                // response.data가 배열이고, 길이가 0보다 크다면 처리
                if (Array.isArray(response.data) && response.data.length > 0) {
                    console.log("reports:", response.data); // 실제 reports 배열 내용 확인

                    // reports를 상태에 설정
                    setReports(response.data);

                    // 가장 최신 보고서 찾기 (최대 reportId)
                    const latestReport = response.data.reduce((max, report) =>
                        (report.reportId >= max.reportId ? report : max), response.data[0]);

                    // 최신 보고서 ID를 사용하여 해당 보고서 불러오기
                    fetchReportById(latestReport.reportId);

                    // 최신 보고서의 createdAt 날짜 기준으로 주간 범위 설정
                    const createdAt = new Date(latestReport.createdAt);
                    const { start, end } = getWeekRange(createdAt);

                    setWeekRange(`${createdAt.getFullYear()}년 ${createdAt.getMonth() + 1}월 <br/> ${start} (${getDayName(new Date(start))}) ~ ${end} (${getDayName(new Date(end))})`);
                    setCurrentWeekStart(createdAt); // 현재 주 시작 날짜 설정
                } else {
                    console.error("보고서가 없습니다.");
                    setIsDataAvailable(false);
                }

                setIsDataAvailable(true); // 데이터가 있다면 true로 설정
            } catch (error) {
                console.error("데이터를 불러오는 데 실패했습니다:", error);
                setIsDataAvailable(false);
            }
        };

        fetchReports(); // 컴포넌트 마운트 시에 데이터 불러오기
    }, [childId]); // childId가 변경될 때마다 호출

    // 선택된 보고서를 불러오는 함수
    const fetchReportById = async (reportId) => {
        try {
            const response = await axios.get(`${REPORT_CHILD_REPORT}/${reportId}`);
            setSelectedReport(response.data); // 선택된 보고서 데이터 설정
        } catch (error) {
            console.error("보고서를 불러오는 데 실패했습니다:", error);
        }
    };

    // 이전 주 데이터로 이동하는 함수
    const loadPreviousWeek = () => {
        if (currentWeekStart) {
            const previousWeekStart = new Date(currentWeekStart);
            previousWeekStart.setDate(previousWeekStart.getDate() - 7); // 이전 주로 이동
            setCurrentWeekStart(previousWeekStart); // currentWeekStart 업데이트

            // 이전 주의 보고서 필터링
            const { start, end } = getWeekRange(previousWeekStart);
            setWeekRange(`${previousWeekStart.getFullYear()}년 ${previousWeekStart.getMonth() + 1}월 <br/> ${start} (${getDayName(new Date(start))}) ~ ${end} (${getDayName(new Date(end))})`);

            // 필터링: 주어진 날짜 범위에 해당하는 보고서만 보여주기
            const previousWeekReports = reports.filter(report => {
                const reportDate = new Date(report.createdAt);
                const { start, end } = getWeekRange(previousWeekStart);
                return reportDate >= new Date(start) && reportDate <= new Date(end);
            });

            if (previousWeekReports.length > 0) {
                setSelectedReport(previousWeekReports[0]); // 첫 번째 보고서 선택
            } else {
                setSelectedReport(null); // 없으면 null로 설정
            }
        }
    };

    // 다음 주 데이터로 이동하는 함수
    const loadNextWeek = () => {
        if (currentWeekStart) {
            const nextWeekStart = new Date(currentWeekStart);
            nextWeekStart.setDate(nextWeekStart.getDate() + 7); // 다음 주로 이동
            setCurrentWeekStart(nextWeekStart); // currentWeekStart 업데이트

            // 다음 주의 보고서 필터링
            const { start, end } = getWeekRange(nextWeekStart);
            setWeekRange(`${nextWeekStart.getFullYear()}년 ${nextWeekStart.getMonth() + 1}월 <br/> ${start} (${getDayName(new Date(start))}) ~ ${end} (${getDayName(new Date(end))})`);

            // 필터링: 주어진 날짜 범위에 해당하는 보고서만 보여주기
            const nextWeekReports = reports.filter(report => {
                const reportDate = new Date(report.createdAt);
                const { start, end } = getWeekRange(nextWeekStart);
                return reportDate >= new Date(start) && reportDate <= new Date(end);
            });

            if (nextWeekReports.length > 0) {
                setSelectedReport(nextWeekReports[0]); // 첫 번째 보고서 선택
            } else {
                setSelectedReport(null); // 없으면 null로 설정
            }
        }
    };

    // 리뷰 시작 버튼 클릭 시 실행되는 함수
    const startReview = () => {
        window.location.href = "/weeklyreview"; // 리뷰 페이지로 이동
    };

    return (
        <>
            <div className="date-range" dangerouslySetInnerHTML={{ __html: weekRange }}></div> {/* 동적으로 계산된 주간 날짜 범위 */}

            {/* 이전 주로 이동 버튼 */}
            <button className="previous-week-button" onClick={loadPreviousWeek}>
                <img src={prev} style={"width=30px"} alt="prev"/>
            </button>

            {/* 다음 주로 이동 버튼 */}
            <button className="next-week-button" onClick={loadNextWeek}>
                <img src={next} alt="next"/>
            </button>

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
                // 데이터가 없을 때 review-box를 표시
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
