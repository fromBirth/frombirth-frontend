/* src/components/baby-diary/BabyDiary.jsx */

import Calendar from "./diary-calendar/DiaryCalendar.jsx";
import imageEx01 from '../../assets/img/imageEx01.png';
import imageEx02 from '../../assets/img/imageEx02.png';
import imageEx03 from '../../assets/img/imageEx03.png';
import imageEx04 from '../../assets/img/imageEx04.png';

import './BabyDiary.css';

const BabyDiary = () => {

    return (
        <>
            <Calendar/>

            <div className="diary-entry">
                <h3>10.11 첫 이유식 도전!</h3>
                <p className="diary-text">오늘 드디어 아기 이유식을 시작했다. 쌀미음을 준비해서 작은 숟가락에 떠서 줬는데, 처음엔 어리둥절하더니 이내 찝찝거리면서 잘 먹었다.
                    얼굴에 이유식을 잔뜩 묻히면서도 열심히 먹는 모습이 너무 귀여웠다. 아직은 양이 적...</p>
                <div className="diary-images">
                    <img src={imageEx01} alt="Image"/>
                    <img src={imageEx02} alt="Image"/>
                    <img src={imageEx03} alt="Image"/>
                    <img src={imageEx04} alt="Image"/>
                </div>
            </div>
        </>
    );
};

export default BabyDiary;