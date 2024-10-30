/* src/components/common/Header.jsx */

import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header className="header">
            <div className='profile-wrap'>
                <div className='profile-img-wrap'>
                    <img src="/src/assets/img/basic_profile.png" alt="Profile Picture" className="profile-image" />
                </div>
                <div className='profile-info-wrap'>
                    <span><b className='name'>홍길동</b>0개월 12일 (만 0세)<i class="bi bi-chevron-down"></i></span>
                    <Link
                        to="/login"
                        style={{
                            fontSize: '12px',
                            color: 'gray',
                            position: 'absolute',
                            top: '10px',
                            right: '10px',
                        }}>로그인</Link>
                </div>
            </div>
        </header>
    );
};

export default Header;
