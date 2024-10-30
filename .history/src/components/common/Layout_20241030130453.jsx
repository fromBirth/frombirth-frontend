/* src/components/Layout.jsx */

import { Link, Outlet, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import '/src/assets/styles/layout.css';

function Layout() {

    const location = useLocation();
    const [activePath, setActivePath] = useState(location.pathname);

    // 라우터 변경 시 활성화 상태 업데이트
    useEffect(() => {
        setActivePath(location.pathname);
    }, [location]);

    return (
        <div className="layout">

            {/* 🔴 페이지 콘텐츠: 헤더와 실제 Outlet을 포함하는 영역 */}
            <div className="content">
                <Outlet /> {/* 자식 페이지들이 이곳에 렌더링됩니다. */}
            </div>

            {/* 🔴 푸터 */}
            <footer className="footer">
                <nav className={"footer-nav"}>
                    <Link to="/babydiary" >
                        <div className={`nav-item ${activePath === '/babydiary' ? 'btn-active' : ''}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" style={{ fill: activePath === '/babydiary' ? 'var(--logo-color)' : 'var(--menu-symbol-color)' }}
                                className="bi bi-journal-bookmark-fill" viewBox="0 0 16 16">
                                <path fillRule="evenodd"
                                    d="M6 1h6v7a.5.5 0 0 1-.757.429L9 7.083 6.757 8.43A.5.5 0 0 1 6 8z" />
                                <path
                                    d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2" />
                                <path
                                    d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1z" />
                            </svg>
                            <span>육아일기</span>
                        </div>
                    </Link>
                    <Link to="/weeklyreport" >
                        <div className={`nav-item ${activePath === '/weeklyreport' ? 'btn-active' : ''}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" style={{ fill: activePath === '/weeklyreport' ? 'var(--logo-color)' : 'var(--menu-symbol-color)' }}
                                className="bi bi-clipboard2-check-fill" viewBox="0 0 16 16">
                                <path
                                    d="M10 .5a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5.5.5 0 0 1-.5.5.5.5 0 0 0-.5.5V2a.5.5 0 0 0 .5.5h5A.5.5 0 0 0 11 2v-.5a.5.5 0 0 0-.5-.5.5.5 0 0 1-.5-.5" />
                                <path
                                    d="M4.085 1H3.5A1.5 1.5 0 0 0 2 2.5v12A1.5 1.5 0 0 0 3.5 16h9a1.5 1.5 0 0 0 1.5-1.5v-12A1.5 1.5 0 0 0 12.5 1h-.585q.084.236.085.5V2a1.5 1.5 0 0 1-1.5 1.5h-5A1.5 1.5 0 0 1 4 2v-.5q.001-.264.085-.5m6.769 6.854-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708.708" />
                            </svg>
                            <span>AI 주간보고</span>
                        </div>

                    </Link>
                    <Link to="/dashboard" >
                        <div className={`nav-item ${activePath === '/dashboard' ? 'btn-active' : ''}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" style={{ fill: activePath === '/dashboard' ? 'var(--logo-color)' : 'var(--menu-symbol-color)' }}
                                className="bi bi-house-door-fill" viewBox="0 0 16 16">
                                <path
                                    d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5" />
                            </svg>
                            <span>메인</span>
                        </div>

                    </Link>
                    <Link to="/growthanalysis" >
                        <div className={`nav-item ${activePath === '/growthanalysis' ? 'btn-active' : ''}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" style={{ fill: activePath === '/growthanalysis' ? 'var(--logo-color)' : 'var(--menu-symbol-color)' }}
                                className="bi bi-bar-chart-fill" viewBox="0 0 16 16">
                                <path
                                    d="M1 11a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1zm5-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1zm5-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1z" />
                            </svg>
                            <span>성장분석</span>
                        </div>

                    </Link>
                    <Link to="/mypage" >
                        <div className={`nav-item ${activePath === '/mypage' ? 'btn-active' : ''}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" style={{ fill: activePath === '/mypage' ? 'var(--logo-color)' : 'var(--menu-symbol-color)' }}
                                className="bi bi-person-fill" viewBox="0 0 16 16">
                                <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
                            </svg>
                            <span>내정보</span>
                        </div>
                    </Link>
                </nav>
            </footer>
        </div>
    );
}

export default Layout;
