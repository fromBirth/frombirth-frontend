/* src/components/dashboard/Dashboard.jsx */

import { Link } from 'react-router-dom';

import './Dashboard.css';
import {useContext, useEffect, useState} from "react";
import AppContext from "../../contexts/AppProvider.jsx";
import {getAmPmHourMinuteByLocalTime, getSelectedChild} from "../../utils/Util.js";
import ChatBot from "../common/ChatBot.jsx";
import PhotoSlide from "./PhotoSlide.jsx";
import axios from "axios";
import {SPRING_RECORD_BASE, SPRING_STATISTIC_BASE} from "../../routes/ApiPath.js";

const Dashboard = () => {
    const {selectedChildId, childList} = useContext(AppContext);
    const selectedChild = getSelectedChild(selectedChildId, childList);
    const {isAm, hour, minute} = getAmPmHourMinuteByLocalTime(selectedChild.birthTime);
    const [childWeight, setChildWeight]=useState(null);
    const [childHeight, setChildHeight]=useState(null);
    const [childDate,setChildDate]=useState(null);
    const [weightPercentage,setWeightPercentage] = useState(null);
    const [heightPercentage,setHeightPercentage] = useState(null);

    // 챗봇 창 상태 관리
    const [isChatBotOpen, setIsChatBotOpen] = useState(false);
    const [isChatBotVisible, setIsChatBotVisible] = useState(false); // ChatBot의 표시 상태

    // 챗봇 열기/닫기 함수
    const toggleChatBot = () => {
        if (!isChatBotOpen) {
            setIsChatBotOpen(true); // 첫 번째 클릭 시 ChatBot을 표시
            setIsChatBotVisible(true); // 이후 클릭 시 표시 상태만 토글
        } else {
            setIsChatBotVisible(!isChatBotVisible); // 두 번째 이후에는 숨김 처리
        }
    };

    // 아이 성장정보 가져오기
    const fetchGrowthData = async () => {
        try {
            const growthResponse = await axios.get(SPRING_RECORD_BASE + `/growth-data/${selectedChildId}`);
            let weight =null;
            let height =null;
            if(!growthResponse.data){
                weight=selectedChild.birthWeight;
                height=selectedChild.birthHeight;
                setChildDate(selectedChild.birthDate);
            }else{
                weight=growthResponse.data.weight;
                height=growthResponse.data.height;
                setChildDate(growthResponse.data.recordDate);
                console.log("설정몸무게2",growthResponse.data.weight);
            }
            const averageResponse = await axios.get(SPRING_STATISTIC_BASE + `/average/${selectedChildId}`);

            let Weightmax = null;
            let Weightmin = null;
            let Heightmax =null;
            let Heightmin = null;
            let calculatedWeightPercentage = null;
            let calculatedHeightPercentage = null;

            if (averageResponse.data) {
                Heightmax= averageResponse.data.avgHeight*1.1;
                Heightmin= averageResponse.data.avgHeight*0.9;
                Weightmax= averageResponse.data.avgWeight*1.1;
                Weightmin= averageResponse.data.avgWeight*0.9;
            }
            if (Heightmax !== null && Heightmin !== null) {
                calculatedHeightPercentage = ((height - Heightmin) / (Heightmax - Heightmin)) * 100
                if (calculatedHeightPercentage < 0) {
                    calculatedHeightPercentage = 0;
                } else if (calculatedHeightPercentage > 100) {
                    calculatedHeightPercentage = 100;
                }
                console.log("키",calculatedHeightPercentage);
                setHeightPercentage(calculatedHeightPercentage.toFixed(0));
            } else {
                setHeightPercentage(null);
            }
            if (Weightmax !== null && Weightmin !== null) {

                calculatedWeightPercentage = ((weight - Weightmin) / (Weightmax - Weightmin)) * 100
                console.log("몸무게",calculatedWeightPercentage);
                if (calculatedWeightPercentage < 0) {
                    calculatedWeightPercentage = 0;
                } else if (calculatedWeightPercentage > 100) {
                    calculatedWeightPercentage = 100;
                }
                console.log("몸무게",calculatedWeightPercentage);
                setWeightPercentage(calculatedWeightPercentage.toFixed(0));
            } else {
                setWeightPercentage(null);
            }
            setChildWeight(weight);
            setChildHeight(height);
        } catch (error) {
            console.error("데이터를 가져오는 중 오류가 발생했습니다.", error);
        }
    };
    useEffect(() => {
        fetchGrowthData();
        console.log("날짜",childDate);
        console.log("출생날짜",selectedChild.birthDate);
    }, [selectedChildId]);
    return (
        <div className="main-content">
            <section className="info-section">
                <h2 className="section-title">아이정보</h2>
                <div className="info-details">
                    <div className="info-item">
                        <span className="label">성별</span>
                        <span className="value">{selectedChild.gender === 'M' ? '남자' : '여자'}</span>
                    </div>
                    <div className="info-item">
                        <span className="label">혈액형</span>
                        <span className="value">{selectedChild.bloodType}</span>
                    </div>
                    <div className="info-item">
                        <span className="label">생년월일</span>
                            <span className="value">{selectedChild.birthDate}</span>
                    </div>
                    <div className="info-item">
                        <span className="label">탄생시간</span>
                        <span
                            className="value">{`${isAm === 'AM' ? '오전' : '오후'} ${Number(hour)}시 ${Number(minute)}분`}</span>
                    </div>
                </div>
            </section>

            <section className="record-section">
                <h2 className="section-title">최근기록<span className='recent-date'>{childDate}</span></h2>
                <div className='record-wrap'>
                    <div className="record-item">
                        <span className="label">키</span>
                        <div className="value"><span className={`tag ${
                            heightPercentage >= (2 / 3) * 100
                                ? "high"
                                : heightPercentage <= (1/ 3) * 100
                                    ? "low"
                                    : "average"
                        }`}>
                                    {heightPercentage >= (2 / 3) * 100 ? "큰편" : heightPercentage <= (1 / 3) * 100 ? "작은편" : "평균"}
                                </span> <span>{childHeight} cm</span></div>
                    </div>
                    <div className="record-item">
                        <span className="label">몸무게</span>
                        <div className="value"> <span className={`tag ${
                            weightPercentage >= (2 / 3) * 100
                                ? "high"
                                : weightPercentage <= (1 / 3) * 100
                                    ? "low"
                                    : "average"
                        }`}>
                                    {weightPercentage >= (2 / 3) * 100 ? "큰편" : weightPercentage <= (1 / 3) * 100 ? "작은편" : "평균"}
                                </span><span>{childWeight} kg</span></div>
                    </div>
                </div>
            </section>

            <section className="menu-section">
                <div className="menu-item">
                    <div className="menu-text">
                        <span className="menu-title">육아일기</span>
                        <span className="menu-count">총 14건</span>
                        <p className="menu-description">하루에 한 번 육아일기를 작성하세요. 키와 몸무게도 기록할 수 있습니다.</p>
                    </div>
                    <i className="bi bi-chevron-right"></i>
                </div>
                <div className="menu-item">
                    <div className="menu-text">
                        <span className="menu-title">AI 주간보고</span>
                        <span className="menu-count">총 2건</span>
                        <p className="menu-description">매주 월요일, 육아 피드백 및 발달장애 진단 보고서가 도착합니다.</p>
                    </div>
                    <i className="bi bi-chevron-right"></i>
                </div>
                <div className="menu-item">
                    <div className="menu-text">
                        <span className="menu-title">성장분석</span>
                        <span className="menu-count">총 2건</span>
                        <p className="menu-description">아이의 성장 추이를 확인하고 또래 평균과 비교해보세요.</p>
                    </div>
                    <i className="bi bi-chevron-right"></i>
                </div>
                <div className="photo-slide">
                    <PhotoSlide selectedChildId={selectedChildId} />
                </div>

                {/* 챗봇 버튼 */}
                <div className="chatbot" onClick={toggleChatBot}>
                    <i className="bi bi-chat-square-dots"></i>
                </div>

                {/* 챗봇 모달 */}
                {isChatBotOpen && (
                    <div
                        className="chatbot-modal open"
                        style={{display: isChatBotVisible ? 'block' : 'none'}} // 두 번째 클릭부터 숨김 처리
                    >

                        <ChatBot onClose={toggleChatBot}/>
                    </div>
                )}
            </section>

            <Link
                to="/login"
                style={{
                    fontSize: '12px',
                    color: 'gray',
                }}
            >
                로그인
            </Link>


        </div>


    );
};

export default Dashboard;
