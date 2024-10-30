import {Routes, Route, Navigate} from 'react-router-dom';
import Main from '../components/main/Dashboard.jsx';
import BabyDiary from '../components/baby-diary/BabyDiary.jsx';
import DiaryList from '../components/baby-diary/DiaryList.jsx';
import DiaryLIstPhoto from '../components/baby-diary/DiaryLIstPhoto.jsx';
import DiaryRegister from '../components/baby-diary/DiaryRegister.jsx';
import DiaryDetail from '../components/baby-diary/DiaryDetail.jsx';
import WeeklyReport from '../components/weekly-report/WeeklyReport.jsx';
import GrowthAnalysis from '../components/growth-analysis/GrowthAnalysis.jsx';
import MyPage from '../components/my-page/MyPage.jsx';
import ChildRegister from '../components/my-page/ChildRegister.jsx';
import Login from "../components/login/Login.jsx";
import Layout from "../components/Layout.jsx";

function AppRouter() {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Navigate to="/main" />} /> {/* 기본 경로에서 /main으로 리다이렉트 */}

            {/* 로그인 후 접근 가능한 페이지 */}
            <Route element={<Layout />}>
                <Route path="/main" element={<Main />} />

                <Route path="/babydiary" element={<BabyDiary />} />
                <Route path="/diarylist" element={<DiaryList />} />
                <Route path="/diarylistphoto" element={<DiaryLIstPhoto />} />
                <Route path="/diaryregister" element={<DiaryRegister />} />
                <Route path="/diarydetail" element={<DiaryDetail />} />

                <Route path="/weeklyreport" element={<WeeklyReport />} />

                <Route path="/growthanalysis" element={<GrowthAnalysis />} />

                <Route path="/mypage" element={<MyPage />} />
                <Route path="/childregister" element={<ChildRegister />} />
            </Route>
        </Routes>
    );
}

export default AppRouter;
