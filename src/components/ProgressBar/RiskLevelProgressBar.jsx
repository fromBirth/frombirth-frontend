import './RiskLevelProgressBar.css';

const RiskLevelProgressBar = ({ riskLevel}) => {
    if (!riskLevel) riskLevel=50;
    return (
        <div className="progress-container">
            <div className="progress-bar-container">
                <div className="progress-bar" style={{width: `${(riskLevel-1)*25}%`}}/>
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
