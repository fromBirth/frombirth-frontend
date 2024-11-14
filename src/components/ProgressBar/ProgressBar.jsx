import styles  from './ProgressBar.module.css';

const ProgressBar = ({ percentage }) => {
    if (!percentage) percentage=50;
    return (
        <div className={styles['progress-container']}>
            <div className={styles['progress-tooltip']} style={{ left: `calc(${percentage}%)` }}>
                {percentage}%
            </div>
            <div className={styles['progress-bar-container']}>
                <div className={styles['progress-bar']} style={{ width: `${percentage}%` }} />
            </div>
            <div className={styles['progress-labels']}>
                <span className={styles['progress-label']}>작은편</span>
                <span className={styles['progress-label']}>평균</span>
                <span className={styles['progress-label']}>큰편</span>
            </div>
        </div>
    );
};
export default ProgressBar;
