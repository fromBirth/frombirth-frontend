import './ProgressBar.css';

const ProgressBar = ({ percentage}) => {
    return (
        <div className="progress-container">
            <div className="progress-tooltip" style={{left: `calc(${percentage}%)`}}>
                {percentage}%
            </div>
            <div className="progress-bar-container">
                <div className="progress-bar" style={{width: `${percentage}%`}}/>
            </div>
            <div className="progress-labels">
                <span className="progress-label">작은편</span>
                <span className="progress-label">평균</span>
                <span className="progress-label">큰편</span>
            </div>
        </div>
    );
};

export default ProgressBar;
