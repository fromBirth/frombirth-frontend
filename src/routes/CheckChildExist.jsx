import  { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AppContext } from '../contexts/AppProvider.jsx';
import {PATHS} from "./paths.js";
const CheckChildExist = () => {
    const { user } = useContext(AppContext);

    if (!user.childList || user.childList.length < 1) {
        console.log(user);
        return <Navigate to={PATHS.MY_PAGE.CHILD_REGISTER} replace />;
    }

    // 인증된 경우 자식 라우트 렌더링
    return <Outlet />;
};

export default CheckChildExist;
