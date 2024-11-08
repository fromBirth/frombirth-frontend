import  { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AppContext } from '../contexts/AppProvider.jsx';
import {PATHS} from "./paths.js";
const CheckChildExist = () => {
    const { childList } = useContext(AppContext);

    if (!childList || childList.length < 1) {
        return <Navigate to={PATHS.CHILD_REGISTER} replace />;
    }

    // 인증된 경우 자식 라우트 렌더링
    return <Outlet />;
};

export default CheckChildExist;
