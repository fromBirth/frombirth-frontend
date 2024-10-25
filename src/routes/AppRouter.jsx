import { Routes, Route } from 'react-router-dom';
import Main from '../pages/main/Main.jsx';
import MyPage from '../pages/my-page/MyPage.jsx';
import BabyDiary from '../pages/baby-diary/BabyDiary.jsx';
import GrowthAnalysis from '../pages/growth-analysis/GrowthAnalysis.jsx';
import WeeklyReport from '../pages/weekly-report/WeeklyReport.jsx';
import Login from "../pages/login/Login.jsx";
import Footer from "../components/Footer.jsx";


function AppRouter() {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />

            {/* 로그인 후 접근 가능한 페이지 */}
            {/* 로그인 후 페이지는 Layout으로 감싸줌 */}
            <Route element={<Footer />}>
                <Route path="/" element={<Main />} />
                <Route path="/mypage" element={<MyPage />} />
                <Route path="/babydiary" element={<BabyDiary />} />
                <Route path="/growthanalysis" element={<GrowthAnalysis />} />
                <Route path="/weeklyreport" element={<WeeklyReport />} />
            </Route>
        </Routes>
    );
}

export default AppRouter;
