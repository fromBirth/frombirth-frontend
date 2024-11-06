/* src/components/common/Header.jsx */

import { useState, useEffect, useRef, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { PATHS } from '../../routes/paths.js';
import { CiCalendarDate } from "react-icons/ci";
import DiarySearch from "../baby-diary/diary-search/DiarySearch.jsx";
import AppContext from "../../contexts/AppProvider.jsx"; // AppContext 가져오기

const Header = () => {
    const location = useLocation();
    const navigate = useNavigate(); // useNavigate 훅 추가
    const { pageTitle } = useContext(AppContext); // context에서 pageTitle 가져오기
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
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

    // 0.2초 지연 후 경로 이동 함수
    const handleNavigation = (path) => {
        setIsSearchOpen(false);
        setTimeout(() => {
            navigate(path); // 지정된 경로로 이동
        }, 200); // 0.2초 지연
    };

    // 뒤로가기 함수
    const handleGoBack = () => {
        setTimeout(() => {
            navigate(-1); // 0.2초 후 이전 페이지로 이동
        }, 200);
    };

    const handleSearchLayout = () => {
        setIsSearchOpen(!isSearchOpen);
    }

    // 경로에 따라 표시할 헤더 내용 분기
    const renderHeaderContent = () => {

        // 검색 아이콘 표시 조건
        const showSearchIcon = (location.pathname.startsWith('/babydiary') || location.pathname.startsWith('/diarylist')) && (
            <button onClick={handleSearchLayout} className="btn-icon btn-search"><i class="bi bi-search"></i></button>
        );

        // 리스트 아이콘 표시 조건
        const showListIcon = (location.pathname.startsWith('/babydiary') || location.pathname.startsWith('/diarylist')) && (
            <button onClick={
                () => handleNavigation(location.pathname.startsWith('/diarylist') ? '/babydiary' : 'diarylist')}
                className="btn-icon btn-viewtype"
            >
                {location.pathname === '/diarylist' ? <i class="bi bi-calendar-date"></i> : <i class="bi bi-list-ul"></i>}
            </button>
        )

        const profilePaths = [
            '/dashboard',
            '/weeklyreport',
            '/growthanalysis',
        ];

        const diaryPaths = [
            '/babydiary',
            '/diarylist',
            '/diarylistphoto'
        ];

        if (profilePaths.some(path => location.pathname.startsWith(path)) || diaryPaths.some(path => location.pathname.startsWith(path))) {
            // profilePaths에 있는 경로라면 프로필 표시
            return (
                <>
                    <div className="header-inner">
                        <div className="profile-wrap" ref={dropdownRef}>
                            <div className="btn-profile" onClick={toggleDropdown}>
                                <div className="profile-img-wrap">
                                    <img
                                        src="/src/assets/img/profile_male.png"
                                        alt="Profile Picture"
                                        className="profile-image"
                                    />
                                </div>
                                <div className="profile-info-wrap">
                                    <b className="name">홍길동</b>{' '}
                                    <span className="info">· 0개월 12일 (만 0세)</span>
                                    <i
                                        className={`bi bi-chevron-down icon ${isDropdownOpen ? 'rotate' : ''
                                            }`}
                                    ></i>
                                </div>
                            </div>

                            {/* 드롭다운 메뉴 */}
                            {isDropdownOpen && (
                                <div className="dropdown-menu">
                                    <div className="dropdown-item active">홍길동</div>
                                    <div className="dropdown-item">홍길순</div>
                                    <div
                                        className="dropdown-item"
                                        onClick={() => handleNavigation(PATHS.CHILD_REGISTER)}
                                    >
                                        아이 등록하기 <i className="bi bi-person-plus"></i>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="page-btn">
                            {/* 일기 검색 */}
                            {showSearchIcon}
                            {/* 일기 뷰 타입 변경(리스트/캘린더) */}
                            {showListIcon}
                        </div>
                    </div>
                    {/* 검색창 열기*/}
                    {isSearchOpen && (<DiarySearch />)}
                </>
            );
        } else {
            // 그 외 경로에서는 다른 콘텐츠 표시 (예시로 뒤로가기 + 페이지 제목 추가)
            return (
                <div className="page-header">
                    <i className="bi bi-chevron-left" onClick={handleGoBack}></i>
                    <span>{pageTitle || '내 정보'}</span> {/* 제목 표시 */}
                </div>
            );
        }
    };

    return <header className="header">{renderHeaderContent()}</header>;
};

export default Header;
