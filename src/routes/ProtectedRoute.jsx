import  { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AppContext } from '../contexts/AppProvider.jsx';
const ProtectedRoute = () => {
    const { user } = useContext(AppContext);

    if (!user) {
        // 인증되지 않은 경우 로그인 페이지로 리다이렉트
        // return <Navigate to={'/login'} replace />;
    }

    // 인증된 경우 자식 라우트 렌더링
    return <Outlet />;
};

export default ProtectedRoute;
