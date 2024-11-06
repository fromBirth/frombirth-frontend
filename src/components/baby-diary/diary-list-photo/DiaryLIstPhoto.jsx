import './DiaryLIstPhoto.css';

const diaryPhotoFormat = (date, images) => {
    return (
        <div className="gallery">
            <h3>{date}</h3>
            <div className="gallery-item">
                {images.map((image, index) => (<img key={index} src={image} />))}
            </div>
        </div>
    );
}

const diaryImagesByMonth = (diaryList) => {
    const imagesByMonth = {};
    diaryList.forEach((diary) => {
        diary.images.forEach((image) => {
            imagesByMonth.append(diary.recordDate, image)
        })
    })

    return imagesByMonth;
}

const DiaryListPhoto = (diaryList) => {
    const imagesByMonth = diaryImagesByMonth(diaryList);

    return (
        imagesByMonth.map((key) => {diaryPhotoFormat(key, imagesByMonth[key])})
    );
};

export default DiaryListPhoto;
