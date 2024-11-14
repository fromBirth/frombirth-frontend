import ProgressBar from "../ProgressBar/ProgressBar.jsx";
import KakaoMap from "../kakao-map/KakaoMap.jsx";
import './WeeklyReport.css';


const ViewSelectedReport = ({selectedReport}) => {
    console.log(selectedReport);
    return (
        <div>
            <div>
                <span className="report-content">{selectedReport.feedback}</span>
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
    );
}

export default ViewSelectedReport;