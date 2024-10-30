/* src/components/Layout.jsx */

import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Toast from '/src/utils/Toast.jsx'; // 토스트 컴포넌트
import '/src/components/common/Layout.css';

function Layout() {
    const location = useLocation();
    const navigate = useNavigate();
    const [activePath, setActivePath] = useState(location.pathname);

    // 라우터 변경 시 활성화 상태 업데이트
    useEffect(() => {
        window.showToast("화면 이동");
        setActivePath(location.pathname);
    }, [location]);

    // 버튼 클릭 시 지연 후 페이지 이동하는 함수(네이티브 앱처럼 부드러운 전환 효과를 위함)
    const handleNavigation = (path) => {
        setTimeout(() => {
            navigate(path); 
        }, 200); // 0.2초 지연
    };

    return (
        <div className="layout">
            <Toast /> {/* Toast 메세지 */}

            {/* 🔴 페이지 콘텐츠: 헤더와 실제 Outlet을 포함하는 영역 */}
            <div className="content">
                <Outlet /> {/* 자식 페이지들이 이곳에 렌더링됩니다. */}
            </div>

            {/* 🔴 푸터 */}
            <footer className="footer">
                <nav className={"footer-nav"}>
                    <div onClick={() => handleNavigation('/babydiary')} className={`nav-item-wrap ${activePath === '/babydiary' ? 'active' : ''}`}>
                        <div className="nav-item">
                            <div className="icon-wrap">
                                <img src={`/src/assets/img/icon_menu_diary${activePath === '/babydiary' ? '_on' : ''}.svg`} className="icon diary" alt="육아일기 아이콘" />
                            </div>
                            <span>육아일기</span>
                        </div>
                    </div>
                    <div onClick={() => handleNavigation('/weeklyreport')} className={`nav-item-wrap ${activePath === '/weeklyreport' ? 'active' : ''}`}>
                        <div className="nav-item">
                            <div className="icon-wrap">
                                <img src={`/src/assets/img/icon_menu_report${activePath === '/weeklyreport' ? '_on' : ''}.svg`} className="icon report" alt="주간보고 아이콘" />
                            </div>
                            <span>AI 주간보고</span>
                        </div>
                    </div>
                    <div onClick={() => handleNavigation('/dashboard')} className={`nav-item-wrap ${activePath === '/dashboard' ? 'active' : ''}`}>
                        <div className="nav-item">
                            <div className="icon-wrap">
                                <img src={`/src/assets/img/icon_menu_main${activePath === '/dashboard' ? '_on' : ''}.svg`} className="icon main" alt="메인 아이콘" />
                            </div>
                            <span>메인</span>
                        </div>
                    </div>
                    <div onClick={() => handleNavigation('/growthanalysis')} className={`nav-item-wrap ${activePath === '/growthanalysis' ? 'active' : ''}`}>
                        <div className="nav-item">
                            <div className="icon-wrap">
                                <img src={`/src/assets/img/icon_menu_growth${activePath === '/growthanalysis' ? '_on' : ''}.svg`} className="icon growth" alt="성장분석 아이콘" />
                            </div>
                            <span>성장분석</span>
                        </div>
                    </div>
                    <div onClick={() => handleNavigation('/mypage')} className={`nav-item-wrap ${activePath === '/mypage' ? 'active' : ''}`}>
                        <div className="nav-item">
                            <div className="icon-wrap">
                                <img src={`/src/assets/img/icon_menu_mypage${activePath === '/mypage' ? '_on' : ''}.svg`} className="icon mypage" alt="내정보 아이콘" />
                            </div>
                            <span>내정보</span>
                        </div>
                    </div>
                </nav>
            </footer>
        </div>
    );
}

export default Layout;
