import {Link, Outlet} from 'react-router-dom';

function Footer() {
    return (
        <div className="layout">
            {/* 페이지 컨텐츠 */}
            <div className="content">
                <Outlet /> {/* 자식 페이지들이 이곳에 렌더링됩니다. */}
            </div>

            {/* 푸터 */}
            <footer className="footer">
                <nav>
                    <ul>
                        <li><Link to="/">Main</Link></li>
                        <li><Link to="/mypage">mypage</Link></li>
                        <li><Link to="/babydiary">babydiary</Link></li>
                        <li><Link to="/growthanalysis">growthanalysis</Link></li>
                        <li><Link to="/weeklyreport">weeklyreport</Link></li>
                    </ul>
                </nav>
                <p>© 2024 fromBirth. All rights reserved.</p>
            </footer>
        </div>
    );
}

export default Footer;
