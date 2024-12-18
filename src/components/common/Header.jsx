/* src/components/common/Header.jsx */

import { useState, useEffect, useRef, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { PATHS } from '../../routes/paths.js';
import DiarySearch from "../baby-diary/diary-search/DiarySearch.jsx";
import AppContext from "../../contexts/AppProvider.jsx";
import basic_profile from '../../assets/img/basic_profile.png';
import {calculateAge, calculateAgeInMonthsAndDays, getSelectedChild} from "../../utils/Util.js";

const Header = () => {
    const location = useLocation();
    const navigate = useNavigate(); // useNavigate 훅 추가
    const { pageTitle } = useContext(AppContext); // context에서 pageTitle 가져오기
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const dropdownRef = useRef(null); // 드롭다운 참조 생성
    const {
        selectedChildId,
        setSelectedChildId,
        childList
    } = useContext(AppContext);

    useEffect(() => {
        if (selectedChildId == null) return;

        localStorage.setItem('selectedChildId', selectedChildId);
        // drawSelectedChildProfile();
        // 추가로 selectedChild 값이 바뀔 때 실행하고 싶은 로직이 있다면 여기에 작성합니다.
    }, [selectedChildId]);

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

    const drawSelectedChildProfile = () => {
        if (childList == null || childList.length === 0) return;

        console.log(childList);
        console.log(selectedChildId);
        const item = getSelectedChild(selectedChildId, childList);
        console.log(item);
        const calculateBirthMonth = calculateAgeInMonthsAndDays(item.birthDate);
        const calculatedAge = calculateAge(item.birthDate);

        return (
            <div className="btn-profile" onClick={toggleDropdown}>
                <div className="profile-img-wrap">
                    <img
                        src={item.profilePicture && !item.profilePicture.toLowerCase().includes('null') ? item.profilePicture : basic_profile}
                        alt="Profile Picture"
                        className="profile-image"
                    />
                </div>
                <div className="profile-info-wrap">
                    <b className="name">{item.name}</b>{' '}
                    <span className="dot">·</span>
                    <span className="info">
                        {calculateBirthMonth}
                        (만 {calculatedAge}세)
                        </span>
                    <i
                        className={`bi bi-chevron-down icon ${isDropdownOpen ? 'rotate' : ''
                        }`}
                    ></i>
                </div>
            </div>
        );
    }

    // 경로에 따라 표시할 헤더 내용 분기
    const renderHeaderContent = () => {

        // 검색 아이콘 표시 조건
        const showSearchIcon = (location.pathname.startsWith('/diarylist')) && (
            <button onClick={handleSearchLayout} className="btn-icon btn-search"><i className="bi bi-search"></i></button>
        );

        // 캘린더or리스트 아이콘 표시 조건
        const showListIcon = (location.pathname.startsWith('/babydiary') || location.pathname.startsWith('/diarylist')) && (
            <button onClick={
                () => handleNavigation(location.pathname.startsWith('/diarylist') ? '/babydiary' : 'diarylist')}
                    className="btn-icon btn-viewtype"
            >
                {location.pathname === '/diarylist' ? <i className="bi bi-calendar-date"></i> : <i className="bi bi-list-ul"></i>}
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
                            {drawSelectedChildProfile()}

                            {/* 드롭다운 메뉴 */}
                            {isDropdownOpen && (
                                <div className="dropdown-menu">
                                    {childList?.map(item => (
                                        <div
                                            className={
                                            `dropdown-item ${item.childId === selectedChildId 
                                                ? 'active' : ''}`}
                                            key={item.childId}
                                            onClick={() => {
                                                setSelectedChildId(item.childId);
                                                setIsDropdownOpen(false); // 아기 선택 시 드롭다운 창 닫기
                                            }}
                                        >
                                            {item.name}
                                        </div>
                                        ))
                                    }
                                    <div
                                        className="dropdown-item"
                                        onClick={() => handleNavigation(PATHS.MY_PAGE.CHILD_REGISTER)}
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
