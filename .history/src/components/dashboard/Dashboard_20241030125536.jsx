/* src/components/dashboard/Dashboard.jsx */

import Header from './components/common/Header';
import './Dashboard.css';

const Dashboard = () => {
    return (
        <>

            <Header />

            <div className="section">
                <h3 className="section-title">아이정보</h3>
                <div className="grid">
                    <span>성별</span><span>남자</span>
                    <span>혈액형</span><span>A형</span>
                    <span>생년월일</span><span>2024.10.01</span>
                    <span>탄생시간</span><span>오후 05시 30분</span>
                </div>
            </div>

            <div className="section">
                <h3 className="section-title">최근기록 2024-10-02</h3>
                <div className="grid">
                    <span>키</span><span className="highlight">평균 64.8 cm</span>
                    <span>몸무게</span><span className="highlight" style={{ color: '#34c759' }}>높은 편 11.2 kg</span>
                </div>
            </div>

            <div className="links-section">
                <div className="link-item">
                    <span>육아일기</span>
                    <span>▶</span>
                </div>
                <div className="link-item">
                    <span>AI 주간보고</span>
                    <span>▶</span>
                </div>
                <div className="link-item">
                    <span>성장분석</span>
                    <span>▶</span>
                </div>
            </div>
        </>
    );
};

export default Dashboard;