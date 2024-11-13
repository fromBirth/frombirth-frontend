/* src/components/baby-diary/diary-list/DiaryList.jsx */

import DiaryListBoard from "../diary-list-board/DiaryListBoard.jsx";
import DiaryListPhoto from "../diary-list-photo/DiaryLIstPhoto.jsx";
import {useState} from "react";

const DiaryList = () => {
    const [isBoard, setIsBoard] = useState(true);

    // useEffect(() => {
    //     setQuery(null);
    // }, [isBoard]);
    const handleIsBoard = (temp) => {
        setIsBoard(temp);
    }

    return (
        <div className="container">
            <div className="tab-bar">
                <div className={"tab " + (isBoard ? "active" : "")}
                    onClick={() => { handleIsBoard(true) }}>
                    전체
                </div>
                <div className={"tab " + (!isBoard ? "active" : "")}
                    onClick={() => { handleIsBoard(false) }}>
                    사진
                </div>
            </div>

            {isBoard && <DiaryListBoard/>}
            {!isBoard && <DiaryListPhoto/>}
        </div>
    );
};

export default DiaryList;
