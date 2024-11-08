/* src/components/baby-diary/diary-list-photo/DiaryLIstPhoto.jsx */

import './DiaryListPhoto.css';

const diaryPhotoFormat = (date, images) => {
    return (
        <div className="gallery" key={date}>
            <h3>{date}</h3>
            <div className="gallery-item">
                {images.map((image, index) => (
                    <img key={index} src={image} alt={`Diary for ${date}`} />
                ))}
            </div>
        </div>
    );
};

const diaryImagesByMonth = (diaryList) => {
    const imagesByMonth = {};

    // diaryList가 배열인지 확인
    if (!Array.isArray(diaryList)) return imagesByMonth;

    diaryList.forEach((diary) => {
        const { recordDate, images } = diary;

        // recordDate를 키로 설정하고, 해당 키에 이미지를 추가
        if (!imagesByMonth[recordDate]) {
            imagesByMonth[recordDate] = [];
        }

        if (Array.isArray(images)) {
            imagesByMonth[recordDate].push(...images);
        }
    });

    return imagesByMonth;
};

const DiaryListPhoto = ({ diaryList }) => {
    const imagesByMonth = diaryImagesByMonth(diaryList);

    // imagesByMonth가 비어있는 경우 처리
    if (!imagesByMonth || Object.keys(imagesByMonth).length === 0) {
        return <p>등록된 일기가 없어요.</p>;
    }

    return (
        <div>
            {Object.keys(imagesByMonth).map((date) =>
                diaryPhotoFormat(date, imagesByMonth[date])
            )}
        </div>
    );
};

export default DiaryListPhoto;
