/* src/components/common/Header.jsx */

const Header = () => {
    return (
        <header className="header">
            <img src="/src/assets/img/basic_profile.png" alt="Profile Picture" className="profile-image" />
            <div>
                <h2 className="header-title">홍길동 - 0개월 12일 (만 0세)</h2>
                <span className="header-dropdown">▼</span>
            </div>
        </header>
    );
};

export default Header;
