/* src/components/common/Header.jsx */

import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

const Header = () => {
    const location = useLocation();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null); // 드롭다운 참조 생성

    // 드롭다운 토글 함수
    const toggleDropdown = () => {
        setTimeout(() => {
            setIsDropdownOpen((prev) => !prev);
        }, 200); // 0.2초 지연
    };

    // 외부 클릭 시 드롭다운 닫기
    useEffect(() => {
        const handleClickOutside = (event) => {
            // 드롭다운이 열려 있고, 클릭한 곳이 드롭다운 외부일 때
            if (isDropdownOpen && dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside); // 이벤트 리스너 등록
        return () => {
            document.removeEventListener("mousedown", handleClickOutside); // 컴포넌트 언마운트 시 리스너 제거
        };
    }, [isDropdownOpen]);

    // 경로에 따라 표시할 헤더 내용 분기
    const renderHeaderContent = () => {
        const profilePaths = [
            '/dashboard',
            '/babydiary',
            '/diarylist',
            '/diarylistphoto',
            '/weeklyreport',
            '/growthanalysis'
        ];

        if (profilePaths.includes(location.pathname)) {
            // profilePaths에 있는 경로라면 프로필 표시
            return (
                <div className='profile-wrap' ref={dropdownRef}>
                    <div className='btn-profile' onClick={toggleDropdown}>
                        <div className='profile-img-wrap'>
                            <img src="/src/assets/img/basic_profile.png" alt="Profile Picture" className="profile-image" />
                        </div>
                        <div className='profile-info-wrap'>
                            <b className='name'>홍길동</b> <span className='info'>· 0개월 12일 (만 0세)</span>
                            <i className={`bi bi-chevron-down icon ${isDropdownOpen ? 'rotate' : ''}`}></i>
                        </div>
                    </div>

                    {/* 드롭다운 메뉴 */}
                    {isDropdownOpen && (
                        <div className="dropdown-menu">
                            <div className="dropdown-item active">홍길동</div>
                            <div className="dropdown-item">홍길순</div>
                            <div className="dropdown-item">
                                아이등록하기 <i className="bi bi-person-plus"></i>
                            </div>
                        </div>
                    )}
                </div>
            );
        } else {
            // 그 외 경로에서는 다른 콘텐츠 표시 (예시로 뒤로가기 + 페이지 제목 추가)
            return (
                <div className='page-header'>
                    <i className="bi bi-chevron-left"></i>
                    <span>내 정보</span>
                </div>
            );
        }
    };

    return (
        <header className="header">
            {renderHeaderContent()}
        </header>
    );
};

export default Header;
