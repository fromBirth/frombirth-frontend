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

const DiaryListBoard = (diaryList) => {

    return (
        <div>
            {diaryList.map((diary) => {
                diaryBoardFormat(diary);
            })}
        </div>
    );
}

export default DiaryListBoard;