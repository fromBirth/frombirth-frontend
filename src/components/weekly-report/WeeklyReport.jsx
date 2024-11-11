import './WeeklyReport.css';
import KakaoMap from "../kakao-map/KakaoMap";
import ProgressBar from "../ProgressBar/ProgressBar";
import React, { useContext, useEffect, useState } from "react";
import axios from 'axios';
import { REPORT_CHILD_ALL_REPORT, REPORT_UPDATE } from '../../routes/ApiPath.js';
import AppContext from "../../contexts/AppProvider.jsx";
import {useLocation, useNavigate} from 'react-router-dom';
import {PATHS} from "../../routes/paths.js"; // useLocation 훅을 사용하여 쿼리 파라미터 받기

// 주간 날짜 범위 계산 함수
const getWeekRange = (date) => {
    const dayOfWeek = date.getDay();
    const diffToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
    const startOfWeek = new Date(date);
    startOfWeek.setDate(date.getDate() + diffToMonday);

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);

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
    const { selectedChildId } = useContext(AppContext);
    const [isAvailable, setIsAvailable] = useState(true);
    const [isDataAvailable, setIsDataAvailable] = useState(true);
    const [isReadAvailable, setIsReadAvailable] = useState(true);
    const [selectedReport, setSelectedReport] = useState(null);
    const [reports, setReports] = useState([]);
    const [weekRange, setWeekRange] = useState("");
    const [currentReportIndex, setCurrentReportIndex] = useState(null);
    const navigate = useNavigate(); // 페이지 이동을 위한 useNavigate 훅
    const location = useLocation();  // location 객체를 사용하여 쿼리 파라미터를 읽기
    const reportIdFromQuery = new URLSearchParams(location.search).get('reportId'); // URL에서 reportId 추출
    console.log("reportIdFromQuery in Review:", reportIdFromQuery); // 쿼리 파라미터로 전달된 reportId 확인
    // URL의 쿼리 파라미터에서 reportId를 추출하는 함수


    useEffect(() => {
        const fetchReports = async () => {
            try {
                const response = await axios.get(`${REPORT_CHILD_ALL_REPORT}/${selectedChildId}`);
                console.log("response.data:", response.data);

                if (Array.isArray(response.data) && response.data.length > 0) {
                    const sortedReports = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                    setReports(sortedReports);

                    let selected = null;
                    if (reportIdFromQuery) {
                        const reportIdInt = parseInt(reportIdFromQuery, 10);
                        selected = sortedReports.find(report => report.reportId === reportIdInt);
                    }

                    if (!selected) {
                        // 쿼리 파라미터에 맞는 보고서가 없으면 가장 최근 보고서 선택
                        selected = sortedReports[0];
                    }

                    setSelectedReport(selected);
                    setCurrentReportIndex(sortedReports.indexOf(selected));

                    const createdAt = new Date(selected.createdAt);
                    const { start, end } = getWeekRange(createdAt);
                    setWeekRange(`${createdAt.getFullYear()}년 ${createdAt.getMonth() + 1}월 <br/> ${start} (${getDayName(new Date(start))}) ~ ${end} (${getDayName(new Date(end))})`);

                    // 마지막에 isReadAvailable 설정 (selectedReport가 확실히 설정된 후에)
                    setIsReadAvailable(selected.read);
                    setIsDataAvailable(true);
                } else {
                    console.error("보고서가 없습니다.");
                    setIsDataAvailable(false);
                }
            } catch (error) {
                console.error("데이터를 불러오는 데 실패했습니다:", error);
                setIsDataAvailable(false);
            }
        };

        fetchReports();
    }, [selectedChildId, reportIdFromQuery]);

    const handleReportChange = (direction) => {
        const newIndex = currentReportIndex + direction;
        if (newIndex >= 0 && newIndex < reports.length) {
            setCurrentReportIndex(newIndex);
            const newReport = reports[newIndex];
            setSelectedReport(newReport);
            setIsReadAvailable(newReport.read);

            const createdAt = new Date(newReport.createdAt);
            const { start, end } = getWeekRange(createdAt);
            setWeekRange(`${createdAt.getFullYear()}년 ${createdAt.getMonth() + 1}월 <br/> ${start} (${getDayName(new Date(start))}) ~ ${end} (${getDayName(new Date(end))})`);
        }
    };

    const loadPreviousReport = () => {
        if (currentReportIndex < reports.length - 1) {
            handleReportChange(1);
        }
    };

    const loadNextReport = () => {
        if (currentReportIndex > 0) {
            handleReportChange(-1);
        }
    };

    const startReview = async () => {
        try {
            if (selectedReport) {
                const updatedReport = {
                    ...selectedReport,
                    read: true
                };

                await axios.put(`${REPORT_UPDATE}/${selectedReport.reportId}`, updatedReport);
                navigate(`${PATHS.WEEKLY_REPORT.REVIEW}?reportId=${selectedReport.reportId}`); // 쿼리 파라미터로 reportId 전달
            }
        } catch (error) {
            console.error("보고서 읽음 상태 업데이트 실패:", error);
        }
    };


    return (
        <>
            <div className="week-button">
                {/* 이전 보고서로 이동 버튼 */}
                <button
                    className="previous-week-button"
                    onClick={loadPreviousReport}
                    style={{visibility: currentReportIndex < reports.length - 1 ? 'visible' : 'hidden'}}
                >
                    <i className="bi bi-chevron-left"></i>
                </button>

                <div className="date-range" dangerouslySetInnerHTML={{ __html: weekRange }}></div> {/* 동적으로 계산된 주간 날짜 범위 */}

                {/* 다음 보고서로 이동 버튼 */}
                <button
                    className="next-week-button"
                    onClick={loadNextReport}
                    style={{visibility: currentReportIndex > 0 ? 'visible' : 'hidden'}}
                >
                    <i className="bi bi-chevron-right"></i>
                </button>
            </div>

            {/* 데이터가 없으면 review-box를 보여주고, 그렇지 않으면 기존의 report-content 등을 보여줌 */}
            {!isReadAvailable ? (
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
            ) : (
                !isAvailable ? (
                    <div className="review-box">
                        <div className="disabled-box">
                            <div className="icon-container">
                                <span className="clock-icon" role="img" aria-label="Clock">🕒</span>
                            </div>
                            <p className="text">AI 주간보고 생성은 <br /> 매주 월요일 9시부터 가능합니다.</p>
                        </div>
                    </div>
                ) : (
                    isDataAvailable && (
                        <div>
                            <div className="report-content">
                                {selectedReport ? selectedReport.feedback : "피드백을 불러오는 중입니다..."}
                            </div>

                            <div className="analysis-section">
                                <h3>일기 분석 결과 위험성 정도</h3>
                                <div className="progress-bar">
                                    <div className="low-risk"></div>
                                    <div className="high-risk"></div>
                                    {selectedReport ? (
                                        <ProgressBar value={selectedReport.riskLevel * 20} />
                                    ) : (
                                        <ProgressBar value={0} />
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
                    )
                )
            )}
        </>
    );
};

export default WeeklyReport;