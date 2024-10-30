import './DiaryList.css';

const DiaryList = () => {
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
                <div className="tab active">전체</div>
                <div className="tab">사진</div>
            </div>

            <div className="entry">
                <div className="entry-title">10.11 두근거리는 금요일</div>
                <p>감정을 파악하고 있어요</p>
            </div>
            <div className="entry">
                <div className="entry-title">10.11 두근거리는 금요일</div>
                <p>감정을 파악하고 있어요</p>
            </div>
            <div className="entry">
                <div className="entry-title">10.11 두근거리는 금요일</div>
                <p>감정을 파악하고 있어요</p>
            </div>
            {/* 필요한 만큼 엔트리를 반복합니다 */}
        </div>
    );
};

export default DiaryList;
