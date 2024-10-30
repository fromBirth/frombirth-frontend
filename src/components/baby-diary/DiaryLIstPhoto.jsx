import './DiaryLIstPhoto.css';

const DiaryListPhoto = () => {

    return (
        <div className="container">
            <div className="header">
                <img src="profile-placeholder.png" alt="Profile Picture" />
                <div>
                    <h2>홍길동 - 0개월 12일 (만 0세)</h2>
                    <span>▼</span>
                </div>
                <div style={{ marginLeft: "auto" }}>
                    <span>🔍 ⋮</span>
                </div>
            </div>

            <div className="tab-bar">
                <div className="tab">전체</div>
                <div className="tab active">사진</div>
            </div>

            <div className="gallery">
                <h3>2024년 10월</h3>
                <div className="gallery-item"></div>
            </div>
        </div>
    );
};

export default DiaryListPhoto;
