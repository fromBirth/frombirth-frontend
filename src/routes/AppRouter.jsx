import { Routes, Route } from 'react-router-dom';
import Main from '../pages/main/Main.jsx';
import MyPage from '../pages/my-page/MyPage.jsx';
import BabyDiary from '../pages/baby-diary/BabyDiary.jsx';
import GrowthAnalysis from '../pages/growth-analysis/GrowthAnalysis.jsx';
import WeeklyReport from '../pages/weekly-report/WeeklyReport.jsx';


function AppRouter() {
    return (
        <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/mypage" element={<MyPage />} />
            <Route path="/babydiary" element={<BabyDiary />} />
            <Route path="/growthanalysis" element={<GrowthAnalysis />} />
            <Route path="/weeklyreport" element={<WeeklyReport />} />
        </Routes>
    );
}

export default AppRouter;
