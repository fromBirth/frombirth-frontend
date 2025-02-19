import './WeeklyReport.css';
import KakaoMap from "../kakao-map/KakaoMap";
import ProgressBar from "../ProgressBar/ProgressBar.jsx";
import React, { useContext, useEffect, useState } from "react";
import axios from 'axios';
import {RECORD_CHILD_ALL_RECORD, REPORT_CHILD_ALL_REPORT, REPORT_UPDATE} from '../../routes/ApiPath.js';
import AppContext from "../../contexts/AppProvider.jsx";
import {useLocation, useNavigate} from 'react-router-dom';
import {PATHS} from "../../routes/paths.js";
import Spinner from "../common/Spinner.jsx"; // useLocation 훅을 사용하여 쿼리 파라미터 받기


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
    const [isSufficientData, setIsSufficientData] = useState(true); // 충분한 데이터 여부 상태 추가

    // getDiaries 함수 정의 (axios 호출)
    const getDiaries = async (childId) => {
        try {
            const response = await axios.get(`${RECORD_CHILD_ALL_RECORD}${childId}`);
            return response.data;
        } catch (error) {
            console.error("일기 데이터를 불러오는 데 실패했습니다:", error);
            return [];  // 오류 발생 시 빈 배열 반환
        }
    };


    useEffect(() => {
        // 월요일 오전 9시 이후인지 체크하는 함수
        const checkIfAvailable = () => {
            const now = new Date();
            const dayOfWeek = now.getDay();
            const hour = now.getHours();
            if (dayOfWeek === 1 && hour >= 9) { // 월요일 09시 이후
                setIsAvailable(true);
            } else if (dayOfWeek === 1 && hour < 9) { // 월요일 00시 ~ 09시
                setIsAvailable(false);
            } else if (dayOfWeek !== 1) { // 월요일이 아닌 다른 요일
                setIsAvailable(true);
            }
        };
        checkIfAvailable(); // 월요일 오전 9시 이후인지 체크

        const checkSufficientData = async () => {
            try {
                const diaries = await getDiaries(selectedChildId);
                console.log("불러온 일기들:", diaries);

                const weekRanges = {};

                const today = new Date();
                // 이번 주의 시작 날짜를 구하는 로직 (이번 주 월요일 기준)
                const firstDayOfWeek = new Date(today);
                const dayOfWeek = today.getDay();
                const diffToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
                firstDayOfWeek.setDate(today.getDate() + diffToMonday);
                firstDayOfWeek.setHours(0, 0, 0, 0);

                diaries.forEach(diary => {
                    const recordDate = new Date(diary.recordDate);

                    // 오늘부터 이번 주 월요일까지의 데이터만 필터링
                    if (recordDate >= firstDayOfWeek) {
                        const { start, end } = getWeekRange(recordDate);  // getWeekRange는 그대로 유지
                        const weekKey = `${start} ~ ${end}`;

                        if (!weekRanges[weekKey]) {
                            weekRanges[weekKey] = [];
                        }

                        weekRanges[weekKey].push(diary);
                    }
                });

                console.log("주별 일기 그룹:", weekRanges);

                let isSufficient = true;

                // weekRanges가 빈 객체인 경우 false로 설정
                if (Object.keys(weekRanges).length === 0) {
                    isSufficient = false;
                    console.log("주별 일기 그룹이 없습니다. 일기가 충분하지 않습니다.");
                }else{
                    // 주별 일기 개수가 3개 미만인 주가 있을 경우 false로 설정
                    for (let range in weekRanges) {
                        console.log(`주간 범위: ${range}, 일기 개수: ${weekRanges[range].length}`);
                        if (weekRanges[range].length < 3) {
                            console.log(`일기 개수가 3개 미만인 주간 범위: ${range}`);
                            isSufficient = false;
                            break;
                        }
                    }
                }

                console.log("최종 isSufficient 값:", isSufficient);
                setIsSufficientData(isSufficient);

            } catch (error) {
                console.error("일기 데이터를 불러오는 데 실패했습니다:", error);
            }
        };

        checkSufficientData();


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
                    // 주간 범위에 맞는 일기 개수 체크
                    checkSufficientData(`${start} ~ ${end}`);
                } else {
                    console.error("보고서가 없습니다.");
                    setIsDataAvailable(false);
                }
            } catch (error) {
                console.error("데이터를 불러오는 데 실패했습니다:", error);
                setIsDataAvailable(false);
            }
        };
        const script = document.createElement('script');
        script.src = "https://unpkg.com/@dotlottie/player-component@2.7.12/dist/dotlottie-player.mjs";
        script.type = "module";
        document.body.appendChild(script);
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
            {
                // AI 주간보고 생성이 불가능하거나 분석되지 않은 경우 (충분한 데이터 + 월요일 오전 00시 ~ 09시 사이 AI 답변 대기시)
                (isAvailable !== isDataAvailable) ? (
                    <div className="review-box">
                        <div className="disabled-box">
                            <div className="icon-container">
                                <div className="lottie-timer">
                                    <dotlottie-player
                                        key={isSufficientData ? true : false}
                                        src={isSufficientData
                                            ? "https://lottie.host/59d8507a-d182-4958-88ca-ce22c420342b/vDXjkuVZKN.json"
                                            : "https://lottie.host/e58273e2-66be-4af4-a7c4-1d8475bc2046/lOFO9WkmbC.json"}
                                        background="transparent"
                                        speed={isSufficientData ? 1 : 2}
                                        className={isSufficientData ? "lottie-timer" : "lottie-nodiary"}
                                        autoplay
                                        loop={false}
                                    />
                                </div>
                            </div>
                            <p className="text">
                                {isSufficientData ? (
                                    <>
                                        AI 주간보고 생성은 <br/> 매주 월요일 9시부터 가능합니다.<br/> <br/>
                                        <span className="sufficient-data">
                                        충분한 일기 기록이 모였습니다. <br/>
                                        더 많은 기록은 진단 정확도를 높여줘요!
                                        </span>
                                    </>

                                ) : (
                                    <>
                                        * 현재 일기가 충분하지 않습니다. <br/> (매 주 최소 3개의 일기 작성이 필요)
                                    </>
                                )}
                            </p>
                        </div>
                    </div>
                ) : (
                    // AI 주간보고 생성 또는 데이터 표시 (읽지 않았을 시)
                    !isReadAvailable ? (
                        // AI 주간보고 생성 가능
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
                            <p className="text">지난주에 작성하신 일기에 대해 <br/> AI 분석을 실시해보세요.</p>
                            <button className="generate-button" onClick={startReview}>AI 주간보고 생성</button>
                        </div>
                    ) : (
                        // 데이터가 존재하고 선택된 보고서가 있을 경우
                        selectedReport ? (
                            <div>
                                <div className="report-content">
                                    {selectedReport ? selectedReport.feedback : "피드백을 불러오는 중입니다..."}
                                </div>

                                <div className="analysis-section">
                                    <h3>일기 분석 결과 위험성 정도</h3>
                                    <div className="progress-bar">
                                        <div className="low-risk"></div>
                                        <div className="high-risk"></div>
                                        <ProgressBar value={selectedReport ? selectedReport.riskLevel * 20 : 0}/>
                                    </div>
                                    <h3>영상분석 결과 위험성 정도</h3>
                                    <div className="progress-bar">
                                        <div className="low-risk"></div>
                                        <div className="high-risk" style={{width: '20%'}}></div>
                                        <ProgressBar value={30}/>

                                    </div>
                                </div>

                                <div className="map-section">
                                    <h3>근처 병원 정보</h3>
                                    <KakaoMap/>
                                </div>
                            </div>
                        ) : (
                            <Spinner/>
                        )
                    )

                )}
        </>
    );
};

export default WeeklyReport;
