/* src/components/baby-diary/diary-list-board/DiaryListBoard.jsx */

import './DiaryListBoard.css';

const diaryBoardFormat = (diary) => {
    return (
        <div className="entry">
            <div className="entry-title">
                <span>{diary.recordDate}</span>
                <h3>{diary.title}</h3>
            </div>
            <p>
                {diary.content}
            </p>
            {diary.images.map(image => {
                <img src={image} alt="" />
            })}
        </div>
    );
}

const DiaryListBoard = ({ diaryList }) => {
    return (
        <div>
            {Array.isArray(diaryList) ? (
                diaryList.map((diary, index) => (
                    <div key={index}>
                        {/* diary 항목 렌더링 */}
                    </div>
                ))
            ) : (
                <p>등록된 일기가 없어요.</p>
            )}
        </div>
    );
};


export default DiaryListBoard;