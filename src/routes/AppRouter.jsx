/* src/routes/AppRouter.jsx */

// React Router의 Routes와 Route 컴포넌트를 사용해 라우팅 구성
import { Routes, Route, Navigate } from 'react-router-dom'; 
// React에서 컴포넌트를 동적 로딩할 수 있도록 Suspense와 lazy를 사용
import { Suspense, lazy } from 'react'; 
// PATHS 객체를 import하여 경로를 상수로 관리
import { PATHS } from './paths'; 
// 전체 레이아웃 컴포넌트로, 로그인이 필요한 페이지의 공통 레이아웃으로 사용
import Layout from '../components/common/Layout.jsx';
// 스피너 컴포넌트 import
import Spinner from '../components/common/Spinner.jsx'; 
// 전역 스타일 파일을 import하여 스타일 적용
import '/src/components/common/Common.css';
import DiarySearch from "../components/baby-diary/DiarySearch.jsx";

// React.lazy를 사용하여 동적 import로 각 페이지를 로딩하여 초기 로딩 속도 최적화
const Login = lazy(() => import('../components/login/Login.jsx'));
const Dashboard = lazy(() => import('../components/dashboard/Dashboard.jsx'));
const BabyDiary = lazy(() => import('../components/baby-diary/BabyDiary.jsx'));
const DiaryList = lazy(() => import('../components/baby-diary/DiaryList.jsx'));
const DiaryListPhoto = lazy(() => import('../components/baby-diary/DiaryListPhoto.jsx'));
const DiaryWrite = lazy(() => import('../components/baby-diary/DiaryWrite.jsx'));
const DiaryView = lazy(() => import('../components/baby-diary/DiaryView.jsx'));
const WeeklyReport = lazy(() => import('../components/weekly-report/WeeklyReport.jsx'));
const GrowthAnalysis = lazy(() => import('../components/growth-analysis/GrowthAnalysis.jsx'));
const MyPage = lazy(() => import('../components/my-page/MyPage.jsx'));
const ChildRegister = lazy(() => import('../components/my-page/ChildRegister.jsx'));

function AppRouter() {
    return (
        // Suspense로 동적 로딩 중 스피너 화면 표시
        <Suspense fallback={<Spinner />}>
            <Routes>
                {/* 로그인 페이지 */}
                <Route path={PATHS.LOGIN} element={<Login />} />

                {/* 기본 경로에서 메인 대시보드 화면으로 리다이렉트 */}
                <Route path="/" element={<Navigate to={PATHS.DASHBOARD} />} />

                {/* Layout 컴포넌트를 상위 요소로 하여 로그인이 필요한 페이지 구성 */}
                <Route element={<Layout />}>
                    {/* 메인 대시보드 페이지 */}
                    <Route path={PATHS.DASHBOARD} element={<Dashboard />} />

                    {/* BabyDiary 관련 페이지 */}
                    <Route path={PATHS.BABY_DIARY} element={<BabyDiary />} />
                    <Route path={PATHS.DIARY_LIST} element={<DiaryList />} />
                    <Route path={PATHS.DIARY_LIST_PHOTO} element={<DiaryListPhoto />} />
                    <Route path={PATHS.DIARY_WRITE} element={<DiaryWrite />} />
                    <Route path={PATHS.DIARY_VIEW} element={<DiaryView />} />
                    <Route path={PATHS.DIARY_SEARCH} element={<DiarySearch />} />

                    {/* WeeklyReport 페이지 */}
                    <Route path={PATHS.WEEKLY_REPORT} element={<WeeklyReport />} />

                    {/* GrowthAnalysis 페이지 */}
                    <Route path={PATHS.GROWTH_ANALYSIS} element={<GrowthAnalysis />} />

                    {/* MyPage 관련 페이지 */}
                    <Route path={PATHS.MY_PAGE} element={<MyPage />} />
                    <Route path={PATHS.CHILD_REGISTER} element={<ChildRegister />} />
                </Route>
            </Routes>
        </Suspense>
    );
}

export default AppRouter;
