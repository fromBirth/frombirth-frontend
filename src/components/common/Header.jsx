/* src/components/common/Header.jsx */

import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header className="header">
            <img src="/src/assets/img/basic_profile.png" alt="Profile Picture" className="profile-image" />
            <div>
                <h2 className="header-title">홍길동 - 0개월 12일 (만 0세)</h2>
                <span className="header-dropdown">▼</span>
                <Link
                    to="/login"
                    style={{
                        fontSize: '12px',
                        color: 'gray',
                        position: 'absolute',
                        top: '10px',
                        right: '10px',
                    }}
                >
                    로그인
                </Link>
            </div>
        </header>
    );
};

export default Header;
