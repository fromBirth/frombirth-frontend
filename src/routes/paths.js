/* src/routes/paths.js */

// PATHS 객체는 애플리케이션에서 사용하는 주요 라우트 경로를 상수로 관리
// 경로가 변경되더라도 이 파일만 수정하면 모든 라우트에 반영되어 유지보수가 용이해짐
export const PATHS = {

    // 로그인 페이지 경로
    LOGIN: "/login",

    // 메인 대시보드 페이지 경로
    DASHBOARD: "/dashboard",

    // 육아 일기 섹션 경로들
    BABY_DIARY: "/babydiary",               // 육아 일기 메인 경로
    DIARY_LIST: "/babydiary/list",          // 일기 목록 페이지 경로
    DIARY_LIST_PHOTO: "/babydiary/listphoto", // 사진으로 보는 일기 목록 경로
    DIARY_REGISTER: "/babydiary/register",  // 일기 작성 페이지 경로
    DIARY_DETAIL: "/babydiary/detail",      // 일기 상세 페이지 경로

    // AI주간보고 페이지 경로
    WEEKLY_REPORT: "/weeklyreport",

    // 성장 분석 페이지 경로
    GROWTH_ANALYSIS: "/growthanalysis",

    // 내정보 섹션 경로들
    MY_PAGE: "/mypage",                     // 마이페이지 메인 경로
    CHILD_REGISTER: "/mypage/register",     // 아이 등록 페이지 경로
};
