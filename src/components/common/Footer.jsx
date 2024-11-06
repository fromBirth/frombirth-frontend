/* src/components/common/Footer.jsx */

import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

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
            <div onClick={() => handleNavigation('/babydiary')} className={`btn-menu ${activePath.startsWith('/babydiary') ? 'active' : ''}`}>
                <div className="btn-menu-inner">
                    <div className="icon-wrap">
                        <img src={`/src/assets/img/icon_menu_diary${activePath === '/babydiary' ? '_on' : ''}.svg`} className="icon diary" alt="육아일기 아이콘" />
                    </div>
                    <span>육아일기</span>
                </div>
            </div>
            <div onClick={() => handleNavigation('/weeklyreport')} className={`btn-menu ${activePath.startsWith('/weeklyreport') ? 'active' : ''}`}>
                <div className="btn-menu-inner">
                    <div className="icon-wrap">
                        <img src={`/src/assets/img/icon_menu_report${activePath.startsWith('/weeklyreport') ? '_on' : ''}.svg`} className="icon report" alt="주간보고 아이콘" />
                    </div>
                    <span>AI 주간보고</span>
                </div>
            </div>
            <div onClick={() => handleNavigation('/dashboard')} className={`btn-menu ${activePath.startsWith('/dashboard') ? 'active' : ''}`}>
                <div className="btn-menu-inner">
                    <div className="icon-wrap">
                        <img src={`/src/assets/img/icon_menu_main${activePath.startsWith('/dashboard') ? '_on' : ''}.svg`} className="icon main" alt="메인 아이콘" />
                    </div>
                    <span>메인</span>
                </div>
            </div>
            <div onClick={() => handleNavigation('/growthanalysis')} className={`btn-menu ${activePath.startsWith('/growthanalysis') ? 'active' : ''}`}>
                <div className="btn-menu-inner">
                    <div className="icon-wrap">
                        <img src={`/src/assets/img/icon_menu_growth${activePath.startsWith('/growthanalysis') ? '_on' : ''}.svg`} className="icon growth" alt="성장분석 아이콘" />
                    </div>
                    <span>성장분석</span>
                </div>
            </div>
            <div onClick={() => handleNavigation('/mypage')} className={`btn-menu ${activePath.startsWith('/mypage') ? 'active' : ''}`}>
                <div className="btn-menu-inner">
                    <div className="icon-wrap">
                        <img src={`/src/assets/img/icon_menu_mypage${activePath.startsWith('/mypage') ? '_on' : ''}.svg`} className="icon mypage" alt="내정보 아이콘" />
                    </div>
                    <span>내정보</span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
