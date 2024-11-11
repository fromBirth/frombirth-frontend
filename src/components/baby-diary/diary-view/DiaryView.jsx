/* src/components/baby-diary/diary-view/DiaryView.jsx */

import './DiaryView.css';
import {getDayOfWeek} from "../../../utils/Util.js";
import {useLocation} from "react-router-dom";

const DiaryView = () => {
    const location = useLocation();
    const diary = location.state;

    return (
        <div className="container">
            <div className="header">{diary.recordDate + ' (' + getDayOfWeek(diary.recordDate) + ') '} 일기</div>

            <div className="entry-title">{diary.title}</div>
            <div className="entry-content">
                {diary.content}
            </div>

            <div className="photos">
                {diary.images?.map((image, index) => <img src={image} alt={"Photo " + index} key={index}/>)}
                <img src="photo1.jpg" alt="Photo 1" />
                <img src="photo2.jpg" alt="Photo 2" />
                <img src="photo3.jpg" alt="Photo 3" />
            </div>
        </div>
    );
};

export default DiaryView;
