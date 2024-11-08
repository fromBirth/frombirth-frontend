/* src/components/dashboard/Dashboard.jsx */

import { Link } from 'react-router-dom';

import './Dashboard.css';
import {useContext} from "react";
import AppContext from "../../contexts/AppProvider.jsx";
import {getAmPmHourMinuteByLocalTime, getSelectedChild} from "../../utils/Util.js";

const Dashboard = () => {
    const {selectedChildId, childList} = useContext(AppContext);
    const selectedChild = getSelectedChild(selectedChildId, childList);
    const {isAm, hour, minute} = getAmPmHourMinuteByLocalTime(selectedChild.birthTime);

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
                        <span className="value">{`${isAm === 'AM' ? '오전' : '오후'} ${Number(hour)}시 ${Number(minute)}분`}</span>
                    </div>
                </div>
            </section>

            <section className="record-section">
                <h2 className="section-title">최근기록<span className='recent-date'>2024-10-02</span></h2>
                <div className='record-wrap'>
                    <div className="record-item">
                        <span className="label">키</span>
                        <div className="value"><span className="tag average">평균</span><span>64.8 cm</span></div>
                    </div>
                    <div className="record-item">
                        <span className="label">몸무게</span>
                        <div className="value"><span className="tag high">높은편</span><span>11.2 kg</span></div>
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