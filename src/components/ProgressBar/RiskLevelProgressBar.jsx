import './RiskLevelProgressBar.css';

const RiskLevelProgressBar = ({ riskLevel, videoResultCount }) => {
    // 기본값 설정: riskLevel 기본값 50, videoResultCount 기본값 0
    if (riskLevel !== undefined && riskLevel !== null) {
        // riskLevel 값이 있을 경우 (1~5 범위로 가정)
        riskLevel = (riskLevel - 1) * 25; // (riskLevel - 1) * 25%
    } else if (videoResultCount !== undefined && videoResultCount !== null) {
        // videoResultCount가 있을 경우 (0~1 범위로 가정)
        riskLevel = videoResultCount * 100; // videoResultCount * 100%
    } else {
        riskLevel = 50; // 기본값
    }

    return (
        <div className="progress-container">
            <div className="progress-bar-container">
                <div className="progress-bar" style={{ width: `${riskLevel}%` }} />
            </div>
            <div className="progress-labels">
                <span className="progress-label">아주 낮음</span>
                <span className="progress-label">낮음</span>
                <span className="progress-label">보통</span>
                <span className="progress-label">높음</span>
                <span className="progress-label">아주 높음</span>
            </div>
        </div>
    );
};

export default RiskLevelProgressBar;
