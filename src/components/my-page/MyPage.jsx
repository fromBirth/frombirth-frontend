/* src/components/dashboard/MyPage.jsx */

import './MyPage.css';
import { useContext } from "react";
import {Link} from "react-router-dom";
import AppContext from "../../contexts/AppProvider.jsx";
import {PATHS} from "../../routes/paths.js";

const MyPage = () => {
    const { user } = useContext(AppContext);
    return (
        <>
            <div className="login-info">
                <h3>로그인 정보</h3>
                <div className="email">
                    <img src="email-icon.png" alt="Email Icon" />
                    <span>{user.email}</span>
                </div>
                <div className="logout">로그아웃</div>
            </div>

            <div className="child-management">
                <h3>내 아이 관리</h3>
                <div className="child-cards">
                    <div className="child-card active-child">
                        <img src="child1.png" alt="Child Image" />
                        <div>
                            홍길동
                            <span style={{ backgroundColor: '#f78e1e', color: 'white', borderRadius: '10px', padding: '2px 5px' }}>현재</span>
                        </div>
                        <small>현재 0일</small>
                    </div>
                    <div className="child-card">
                        <Link to={PATHS.CHILD_REGISTER}>
                            {/*<img src="add-child.png" alt="Add Child" />*/}
                            <div>아이추가</div>
                            <small>(1/5)</small>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default MyPage;
