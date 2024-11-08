/* src/components/baby-diary/diary-view/DiaryView.jsx */

import './DiaryView.css';

const DiaryView = () => {
    return (
        <div className="container">
            <div className="header">10/13(일) 일기</div>

            <div className="entry-title">낮잠 실패의 하루</div>
            <div className="entry-content">
                오늘 아기가 낮잠을 거의 안 자서 하루 종일 조금 힘들었다. 평소엔 2시간 자는데, 오늘은 30분만 자고 깼다. 덕분에 쉴 틈은 없었지만, 아기가 내 품에 오래 있어서 평소보다 더 사랑스러웠다. 저녁에 겨우 잠들면서도 방긋 웃는 걸 보니 힘든 하루였지만 따뜻한 마음이 남았다.
            </div>

            <div className="photos">
                <img src="photo1.jpg" alt="Photo 1" />
                <img src="photo2.jpg" alt="Photo 2" />
                <img src="photo3.jpg" alt="Photo 3" />
            </div>
        </div>
    );
};

export default DiaryView;
