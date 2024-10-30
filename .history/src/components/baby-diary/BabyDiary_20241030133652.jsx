/* src/components/dashboard/BabyDiary.jsx */

import Header from '../common/Header.jsx';
import Calendar from "./diary-calendar/DiaryCalendar.jsx";
import './BabyDiary.css';

const BabyDiary = () => {

    return (
        <>
            <Header />

            <Calendar/>

            <div className="diary-entry">
                <h3>10.11 첫 이유식 도전!</h3>
                <p className="diary-text">오늘 드디어 아기 이유식을 시작했다. 쌀미음을 준비해서 작은 숟가락에 떠서 줬는데, 처음엔 어리둥절하더니 이내 찝찝거리면서 잘 먹었다.
                    얼굴에 이유식을 잔뜩 묻히면서도 열심히 먹는 모습이 너무 귀여웠다. 아직은 양이 적...</p>
                <div className="diary-images">
                    <img src="food1.png" alt="Food Image"/>
                    <img src="food2.png" alt="Food Image"/>
                    <img src="food3.png" alt="Food Image"/>
                    <img src="food4.png" alt="Food Image"/>
                </div>
            </div>
        </>
    );
};

export default BabyDiary;