/* src/components/Layout.jsx */

import { Outlet, useLocation } from 'react-router-dom';
import {useContext, useEffect} from 'react';
import Header from '../common/Header.jsx';
import Footer from '../common/Footer.jsx';
import Toast from '/src/utils/Toast.jsx'; // 토스트 컴포넌트
import '/src/components/common/Layout.css';
import {CHILDREN_LIST_BY_USER} from "../../routes/ApiPath.js";
import axios from "axios";
import AppContext from "../../contexts/AppProvider.jsx";

function Layout() {
    const location = useLocation();
    // const {user, setUser} = useContext(AppContext);

    // 라우터 변경 시 활성화 상태 업데이트
    useEffect(() => {
        // window.showToast("페이지 로드");
    }, [location]);

    // useEffect(() => {
    //     let {data} = axios.get(CHILDREN_LIST_BY_USER + user.userId);
    //     setUser(prev => ({...prev, childList: data}));
    //     console.log(user);
    // })

    return (
        <div className="layout">
            <Toast /> {/* Toast 메세지 */}

            <Header />

            {/* 🔴 페이지 콘텐츠: 헤더와 실제 Outlet을 포함하는 영역 */}
            <div className="content">
                <Outlet /> {/* 자식 페이지 렌더링 */}
            </div>

            {/* Footer 컴포넌트 */}
            <Footer />
        </div>
    );
}

export default Layout;
