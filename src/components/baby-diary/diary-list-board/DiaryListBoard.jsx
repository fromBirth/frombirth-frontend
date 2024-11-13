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
import {debounce} from "lodash";

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

    const debouncedFetchNextPage = debounce(() => {
        if (inView) fetchNextPage();
    }, 500);

    useEffect(() => {
        debouncedFetchNextPage();
        return () => debouncedFetchNextPage.cancel();
    }, [inView, debouncedFetchNextPage]);

    function handleViewDiary(diary) {
        navigate(PATHS.BABY_DIARY.VIEW, {state: diary});
    }

    // 요일을 가져오는 함수
    const getDayOfWeek = (dateString) => {
        const date = new Date(dateString);
        const days = ["일", "월", "화", "수", "목", "금", "토"];
        return days[date.getDay()];
    };

    return (
        <div>
            {diaryInfoList && diaryInfoList.pages.map((page, index) => (
                <Fragment key={index}>
                    {page.data.map(diary =>
                        <div className="entry list" key={diary.recordId} onClick={() => handleViewDiary(diary)}>
                            <div className="entry-title">
                                <div className="date">{`${diary.recordDate} (${getDayOfWeek(diary.recordDate)})`}</div>
                                <h3>{diary.title}</h3>
                            </div>
                            <div className="entry-content">
                                {diary.content}
                            </div>
                            <div className="diary-list-board-photo-box">
                                {diary.images.map((image) => {
                                    return (
                                        image.photoId &&
                                        <img
                                            src={image.url}
                                            alt={image.photoId}
                                            key={image.photoId}
                                            className="diary-list-board-photo"
                                        />
                                    )
                                })}
                            </div>
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