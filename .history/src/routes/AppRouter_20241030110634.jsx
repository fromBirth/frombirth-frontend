// src/routes/AppRouter.jsx
import { Routes, Route, Navigate } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { PATHS } from './paths';
import Layout from '../components/Layout.jsx';
import '/src/assets/styles/variables.css';
import '/src/assets/styles/fonts.css';
import '/src/assets/styles/common.css';

const Login = lazy(() => import('../components/login/Login.jsx'));
const Main = lazy(() => import('../components/main/Dashboard.jsx'));
const BabyDiary = lazy(() => import('../components/baby-diary/BabyDiary.jsx'));
const DiaryList = lazy(() => import('../components/baby-diary/DiaryList.jsx'));
const DiaryListPhoto = lazy(() => import('../components/baby-diary/DiaryListPhoto.jsx'));
const DiaryRegister = lazy(() => import('../components/baby-diary/DiaryRegister.jsx'));
const DiaryDetail = lazy(() => import('../components/baby-diary/DiaryDetail.jsx'));
const WeeklyReport = lazy(() => import('../components/weekly-report/WeeklyReport.jsx'));
const GrowthAnalysis = lazy(() => import('../components/growth-analysis/GrowthAnalysis.jsx'));
const MyPage = lazy(() => import('../components/my-page/MyPage.jsx'));
const ChildRegister = lazy(() => import('../components/my-page/ChildRegister.jsx'));

function AppRouter() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Routes>
                <Route path={PATHS.LOGIN} element={<Login />} />
                <Route path="/" element={<Navigate to={PATHS.MAIN} />} />

                {/* 로그인 후 접근 가능한 페이지 */}
                <Route element={<Layout />}>
                    <Route path={PATHS.MAIN} element={<Main />} />
                    <Route path={PATHS.BABY_DIARY} element={<BabyDiary />} />
                    <Route path={PATHS.DIARY_LIST} element={<DiaryList />} />
                    <Route path={PATHS.DIARY_LIST_PHOTO} element={<DiaryListPhoto />} />
                    <Route path={PATHS.DIARY_REGISTER} element={<DiaryRegister />} />
                    <Route path={PATHS.DIARY_DETAIL} element={<DiaryDetail />} />
                    <Route path={PATHS.WEEKLY_REPORT} element={<WeeklyReport />} />
                    <Route path={PATHS.GROWTH_ANALYSIS} element={<GrowthAnalysis />} />
                    <Route path={PATHS.MY_PAGE} element={<MyPage />} />
                    <Route path={PATHS.CHILD_REGISTER} element={<ChildRegister />} />
                </Route>
            </Routes>
        </Suspense>
    );
}

export default AppRouter;
