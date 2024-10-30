import './DiaryRegister.css';

const DiaryRegister = () => {
    return (
        <div className="container">
            <h2>10/13(일) 일기 작성</h2>

            <div className="input-row">
                <input type="number" placeholder="50" min="0" max="200" aria-label="키 입력" />
                <span>cm</span>
                <input type="number" placeholder="0.0" min="0" max="200" aria-label="몸무게 입력" />
                <span>kg</span>
            </div>

            <div className="upload-section">
                <label>사진</label>
                <div className="upload-box" aria-label="사진 업로드">+</div>
                <small>0/5</small>
            </div>

            <div className="upload-section">
                <label>영상 <small>(발달장애 진단용)</small></label>
                <div className="upload-box" aria-label="영상 업로드">+</div>
            </div>

            <textarea className="textarea" rows="1" placeholder="일기 제목을 작성해주세요." aria-label="일기 제목 입력"></textarea>
            <textarea className="textarea" rows="5" placeholder="일기를 작성해주세요." maxLength="500" aria-label="일기 내용 입력"></textarea>
            <small>0/500자</small>

            <button className="submit-btn" aria-label="일기 등록">등록하기</button>
        </div>
    );
};

export default DiaryRegister;
