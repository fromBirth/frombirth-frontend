/* src/components/baby-diary/diary-list/DiaryList.jsx */

import './DiaryList.css';
import DiaryListBoard from "../diary-list-board/DiaryListBoard.jsx";
import DiaryListPhoto from "../diary-list-photo/DiaryLIstPhoto.jsx";
import {useState} from "react";

const DiaryList = () => {
    const [isBoard, setIsBoard] = useState(true);

    return (
        <div className="container">
            <div className="tab-bar">
                <div className={"tab " + (isBoard ? "active" : "")}
                    onClick={() => { setIsBoard(true) }}>
                    전체
                </div>
                <div className={"tab " + (!isBoard ? "active" : "")}
                    onClick={() => { setIsBoard(false) }}>
                    사진
                </div>
            </div>

            {isBoard && <DiaryListBoard/>}
            {!isBoard && <DiaryListPhoto diaryList={diaryList} />}

            {/*<div className="entry">*/}
            {/*    <div className="entry-title">10.11 두근거리는 금요일</div>*/}
            {/*    <p>감정을 파악하고 있어요</p>*/}
            {/*</div>*/}
            {/*<div className="entry">*/}
            {/*    <div className="entry-title">10.11 두근거리는 금요일</div>*/}
            {/*    <p>감정을 파악하고 있어요</p>*/}
            {/*</div>*/}
            {/*<div className="entry">*/}
            {/*    <div className="entry-title">10.11 두근거리는 금요일</div>*/}
            {/*    <p>감정을 파악하고 있어요</p>*/}
            {/*</div>*/}
            {/* 필요한 만큼 엔트리를 반복합니다 */}
        </div>
    );
};

export default DiaryList;
