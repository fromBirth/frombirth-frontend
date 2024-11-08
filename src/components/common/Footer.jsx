/* src/components/common/Footer.jsx */

import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { PATHS } from "../../routes/paths.js";

const Footer = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [activePath, setActivePath] = useState(location.pathname);

    // 라우터 변경 시 활성화 상태 업데이트
    useEffect(() => {
        setActivePath(location.pathname);
    }, [location]);

    // 버튼 클릭 시 지연 후 페이지 이동하는 함수 (네이티브 앱처럼 부드러운 전환 효과를 위함)
    const handleNavigation = (path) => {
        setTimeout(() => {
            navigate(path);
        }, 200); // 0.2초 지연
    };

    return (
        <footer className="footer">
            {/* 육아일기 섹션 */}
            <div
                onClick={() => handleNavigation(PATHS.BABY_DIARY.MAIN)}
                className={`btn-menu ${Object.values(PATHS.BABY_DIARY).some(path => activePath.startsWith(path)) ? 'active' : ''
                    }`}
            >
                <div className="btn-menu-inner">
                    <div className="icon-wrap">
                        <img src={`/src/assets/img/icon_menu_diary${Object.values(PATHS.BABY_DIARY).some(path => activePath.startsWith(path)) ? '_on' : ''}.svg`} className="icon diary" alt="육아일기 아이콘" />
                    </div>
                    <span>육아일기</span>
                </div>
            </div>

            {/* 주간보고 섹션 */}
            <div
                onClick={() => handleNavigation(PATHS.WEEKLY_REPORT.MAIN)}
                className={`btn-menu ${Object.values(PATHS.WEEKLY_REPORT).some(path => activePath.startsWith(path)) ? 'active' : ''
                    }`}
            >
                <div className="btn-menu-inner">
                    <div className="icon-wrap">
                        <img src={`/src/assets/img/icon_menu_report${Object.values(PATHS.WEEKLY_REPORT).some(path => activePath.startsWith(path)) ? '_on' : ''}.svg`} className="icon report" alt="주간보고 아이콘" />
                    </div>
                    <span>AI 주간보고</span>
                </div>
            </div>

            {/* 메인 대시보드 */}
            <div
                onClick={() => handleNavigation(PATHS.DASHBOARD)}
                className={`btn-menu ${activePath.startsWith(PATHS.DASHBOARD) ? 'active' : ''}`}
            >
                <div className="btn-menu-inner">
                    <div className="icon-wrap">
                        <img src={`/src/assets/img/icon_menu_main${activePath.startsWith(PATHS.DASHBOARD) ? '_on' : ''}.svg`} className="icon main" alt="메인 아이콘" />
                    </div>
                    <span>메인</span>
                </div>
            </div>

            {/* 성장분석 섹션 */}
            <div
                onClick={() => handleNavigation(PATHS.GROWTH_ANALYSIS)}
                className={`btn-menu ${activePath.startsWith(PATHS.GROWTH_ANALYSIS) ? 'active' : ''}`}
            >
                <div className="btn-menu-inner">
                    <div className="icon-wrap">
                        <img src={`/src/assets/img/icon_menu_growth${activePath.startsWith(PATHS.GROWTH_ANALYSIS) ? '_on' : ''}.svg`} className="icon growth" alt="성장분석 아이콘" />
                    </div>
                    <span>성장분석</span>
                </div>
            </div>

            {/* 내정보 섹션 */}
            <div
                onClick={() => handleNavigation(PATHS.MY_PAGE.MAIN)}
                className={`btn-menu ${Object.values(PATHS.MY_PAGE).some(path => activePath.startsWith(path)) ? 'active' : ''
                    }`}
            >
                <div className="btn-menu-inner">
                    <div className="icon-wrap">
                        <img src={`/src/assets/img/icon_menu_mypage${Object.values(PATHS.MY_PAGE).some(path => activePath.startsWith(path)) ? '_on' : ''}.svg`} className="icon mypage" alt="내정보 아이콘" />
                    </div>
                    <span>내정보</span>
                </div>
            </div>
        </footer>

    );
};

export default Footer;
