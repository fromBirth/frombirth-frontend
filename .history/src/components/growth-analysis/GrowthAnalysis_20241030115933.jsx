import React from 'react';
import './GrowthAnalysis.css';

const GrowthAnalysis = () => {
    return (
        <div className="container">
            <div className="header">
                <img src="profile-placeholder.png" alt="Profile Picture" className="profile-image" />
                <div>
                    <h2 className="header-title">홍길동 - 0개월 12일 (만 0세)</h2>
                    <span className="header-dropdown">▼</span>
                </div>
            </div>

            <div className="tabs">
                <div className="tab active">키</div>
                <div className="tab">몸무게</div>
            </div>

            <div className="section-title">3개월 전</div>
            <div className="highlight-text">
                홍길순 님의 키는 <span style={{ color: '#f78e1e' }}>평균 64.8 cm</span> 이에요 ✏️
            </div>

            <div className="progress-bar">
                <div className="progress"></div>
            </div>
            <div className="range-labels">
                <span>작은편</span>
                <span>평균</span>
                <span>큰편</span>
            </div>

            <div className="chart">
                <svg width="100%" height="200">
                    <polyline points="20,150 80,130 140,110 200,90" style={{ fill: 'none', stroke: '#f78e1e', strokeWidth: 2 }} />
                    <circle cx="20" cy="150" r="4" fill="#f78e1e" />
                    <circle cx="80" cy="130" r="4" fill="#f78e1e" />
                    <circle cx="140" cy="110" r="4" fill="#f78e1e" />
                    <circle cx="200" cy="90" r="6" fill="#f78e1e" stroke="#f78e1e" strokeWidth="2" />
                </svg>
                <div style={{ display: 'flex', justifyContent: 'space-around', fontSize: '12px', color: 'gray' }}>
                    <span>05.12</span>
                    <span>06.12</span>
                    <span>07.12</span>
                </div>
            </div>
        </div>
    );
};

export default GrowthAnalysis;
