/* src/components/baby-diary/diary-list-board/DiaryListBoard.jsx */

import './DiaryListBoard.css';
import {useInView} from "react-intersection-observer";
import {Fragment, useContext, useEffect, useState} from "react";
import {useInfiniteQuery} from "react-query";
import {getDiariesListInfinitely} from "../DiaryCommonFunction.js";
import Spinner from "../../common/Spinner.jsx";
import AppContext from "../../../contexts/AppProvider.jsx";
import {useNavigate} from "react-router-dom";
import {PATHS} from "../../../routes/paths.js";

const DiaryListBoard = () => {
    const navigate = useNavigate();
    const {selectedChildId, query} = useContext(AppContext);
    console.log(query);
    const {ref, inView} = useInView();
    const {data: diaryInfoList, fetchNextPage, isFetchingNextPage} = useInfiniteQuery(
        ['infiniteDiaryList', selectedChildId, query],
        ({pageParam = 999999}) => getDiariesListInfinitely(selectedChildId, pageParam, 10, query),
        {
            getNextPageParam: (lastPage) =>
                !lastPage.isLast ? lastPage.nextLastRecordId : undefined

        }
    );

    console.log(diaryInfoList);

    useEffect(() => {
        if (inView) fetchNextPage();
    }, [inView]);

    function handleViewDiary(diary) {
        navigate(PATHS.BABY_DIARY.VIEW, {state: diary});
    }

    return (
        <div>
            {diaryInfoList && diaryInfoList.pages.map((page, index) => (
                <Fragment key={index}>
                    {page.data.map(diary =>
                        <div className="entry" key={diary.recordId} onClick={() => handleViewDiary(diary)}>
                            <div className="entry-title">
                                <span>{diary.recordDate}</span>
                                <h3>{diary.title}</h3>
                            </div>
                            <p>
                                {diary.content}
                            </p>
                            {diary.images?.map((image, index) => {
                                <img src={image} alt="" key={index}/>
                            })}
                        </div>
                    )}
                </Fragment>
                //     ))
                // ) : (
                //     <p>등록된 일기가 없어요.</p>
                // )
            ))}
            {isFetchingNextPage ? <Spinner/> : <div ref={ref}></div>}
        </div>
    );
};


export default DiaryListBoard;