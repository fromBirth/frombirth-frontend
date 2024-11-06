/* src/components/dashboard/WeeklyReport.jsx */

import './WeeklyReport.css';
import KakaoMap from "../kakao-map/KakaoMap";
import ProgressBar from "../ProgressBar/ProgressBar";

const WeeklyReport = () => {


    return (
        <>
            <div className="date-range">2024년 10월 3주<br/>2024.10.14 (월) ~ 2024.10.14 (월)</div>

            <div className="report-content">
                이번 주에 아기가 분유도 잘 먹어서 기쁘셨을 것 같아요. 활발하게 성장하는 모습을 보니 더욱 뿌듯하셨겠죠. 하지만 유치원에서 산만하다는 피드백을 듣고 걱정이 되실 수도 있을 것 같아요.
                집중력을 기를 수 있도록, 집에서 조용한 놀이 시간을 자주 가져보는 것도 큰 도움이 될 거예요. 너무 큰 걱정은 하지 마시고, 아이의 속도에 맞춰 따뜻하게 응원해 주세요. 앞으로 점점 더
                나아질 테니, 조금 더 지켜봐 주세요.
            </div>

            <div className="analysis-section">
                <h3>일기 분석 결과 위험성 정도</h3>
                <div className="progress-bar">
                    <div className="low-risk"></div>
                    <div className="high-risk"></div>
                    <ProgressBar value={30}/>
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
        </>
    );
};

export default WeeklyReport;
