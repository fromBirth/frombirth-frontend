/* src/components/dashboard/MyPage.jsx */

import './MyPage.css';
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AppContext from "../../contexts/AppProvider.jsx";
import { PATHS } from "../../routes/paths.js";
import kakao_icon from '../../assets/img/kakao.png';
import basic_profile from '../../assets/img/basic_profile.png';

const MyPage = () => {
    const { user } = useContext(AppContext);
    const { setPageTitle } = useContext(AppContext); // context에서 setPageTitle 가져오기
    const navigate = useNavigate(); // 페이지 이동을 위한 useNavigate 훅
    setPageTitle('내정보');

    // 아이 추가 클릭 시 이동할 함수
    const handleAddChildClick = () => {
        setTimeout(() => {
            navigate(PATHS.CHILD_REGISTER);
        }, 200); // 0.2초 지연
    };

    return (
        <div className="container menu_mypage">
            <div className="login-info">
                <h3>로그인 정보</h3>
                <div className="email_wrap">
                    <img src={kakao_icon} className="kakao-icon" alt="" />
                    <div className="email_info" >
                        <div>이메일</div>
                        <div>{user.email}</div>
                    </div>
                    <div className="logout">로그아웃</div>
                </div>
            </div>

            <div className="child-management">
                <h3>내 아이 관리</h3>
                <div className="child-cards">
                    <div className="child-card active-child">
                        <img src={basic_profile} alt="Child Image" className="child-image" />
                        <div className="child-name">
                            <span className="current-label">현재</span>
                            홍길동
                        </div>
                        <small className="child-age">0개월 12일</small>
                    </div>
                    <div className="child-card">
                        <img src={basic_profile} alt="Child Image" className="child-image" />
                        <div className="child-name">
                            홍길동
                        </div>
                        <small className="child-age">22개월 42일</small>
                    </div>
                    <div className="child-card add-child" onClick={handleAddChildClick}>
                        <div className="add-icon">+</div>
                        <div className="add-text">아이추가</div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default MyPage;
