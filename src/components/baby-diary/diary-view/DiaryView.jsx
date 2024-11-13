import './DiaryView.css';
import { getDayOfWeek } from "../../../utils/Util.js";
import { useLocation } from "react-router-dom";
import { useContext, useEffect } from "react";
import AppContext from "../../../contexts/AppProvider.jsx";

const DiaryView = () => {
    const location = useLocation();
    const diary = location.state;
    const { setPageTitle } = useContext(AppContext); // setPageTitle 가져오기

    useEffect(() => {
        if (diary?.recordDate) {
            // 날짜와 요일을 타이틀로 설정
            const title = `${diary.recordDate} (${getDayOfWeek(diary.recordDate)})`;
            setPageTitle(title);
        }
    }, [diary?.recordDate, setPageTitle]);

    return (
        <div className="container entry-view">
            {(diary.height || diary.weight) && (
                <div className="entry-size">
                    {diary.height && <div className="size-item">키 : {diary.height} cm</div>}
                    {diary.weight && <div className="size-item">몸무게 : {diary.weight} kg</div>}
                </div>
            )}
            <div className="entry-title">{diary.title}</div>
            <div className="entry-content">
                {diary.content}
            </div>
            <div className="photos">
                {diary.images?.map((image) => {
                    return (
                        image.photoId &&
                        <img src={image.url} alt={"Photo " + image.photoId} key={image.photoId}/>
                    );
                })}
            </div>
        </div>
    );
};

export default DiaryView;
