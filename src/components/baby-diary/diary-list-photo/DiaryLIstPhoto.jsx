/* src/components/baby-diary/diary-list-photo/DiaryLIstPhoto.jsx */

import './DiaryListPhoto.css';
import {Fragment, useContext, useEffect} from "react";
import AppContext from "../../../contexts/AppProvider.jsx";
import {useInView} from "react-intersection-observer";
import {useInfiniteQuery} from "react-query";
import {getDiariesListInfinitely, getDiaryPhotos} from "../DiaryCommonFunction.js";
import {getNextMonthFirstDay} from "../../../utils/Util.js";
import Spinner from "../../common/Spinner.jsx";

const DiaryListPhoto = () => {
    const {selectedChildId, query} = useContext(AppContext);
    console.log(query);
    const {ref, inView} = useInView();
    const {data: photoInfoList, fetchNextPage, isFetchingNextPage} = useInfiniteQuery(
        ['infiniteDiaryPhotoList', selectedChildId, query],
        ({pageParam = getNextMonthFirstDay()}) => getDiaryPhotos(selectedChildId, pageParam, 10, query),
        {
            getNextPageParam: (lastPage) =>
                !lastPage.isLast ? lastPage.nextLastRecordId : undefined

        }
    );

    console.log(photoInfoList);

    useEffect(() => {
        if (inView) fetchNextPage();
    }, [inView]);

    return (
        <div>
            {photoInfoList && photoInfoList.pages.map((page, index) => (
                <Fragment key={index}>
                    {page.data.map(monthPhotos =>
                        <div className="gallery" key={monthPhotos.month}>
                            <h3>{monthPhotos.month}</h3>
                            <div className="gallery-item">
                                {monthPhotos.photos.map((image) => {
                                    return (
                                        image.photoId &&
                                        <img
                                            key={image.photoId}
                                            src={image.url}
                                            alt=""
                                            className="gallery-image"
                                        />
                                    )
                                })}
                            </div>
                        </div>
                    )}
                </Fragment>
            ))}
            {isFetchingNextPage ? <Spinner/> : <div ref={ref}></div>}
        </div>
    );
};

export default DiaryListPhoto;
