import {createContext, useEffect, useState} from 'react';
import axios from "axios";
import {CHILDREN_LIST_BY_USER} from "../routes/ApiPath.js";
import Spinner from "../components/common/Spinner.jsx";

export const AppContext = createContext(null);


export const AppProvider = ({ children }) => {
    const [user, setUser] = useState({ email: '', userId: null }); // 사용자 정보
    const [pageTitle, setPageTitle] = useState(''); // 화면 제목
    const [selectedChildId, setSelectedChildId] = useState();
    const [childList, setChildList] = useState([]);
    const [isLoading, setIsLoading] = useState(false); // 로딩 상태 추가
    const [query, setQuery] = useState("");

    useEffect(() => {
        if (childList.length < 1) return;
        console.log(childList);
        console.log(localStorage.getItem('selectedChildId'));

        const isUserChild = childList.find((item) => item.childId === Number(localStorage.getItem('selectedChildId')));
        console.log('isUserChild : ', isUserChild);

        if (isUserChild) {
            setSelectedChildId(isUserChild.childId);
        }

        if (!localStorage.getItem('selectedChildId') || !isUserChild) {
            const lastChildId = childList[childList.length - 1]?.childId;
            if (lastChildId) {
                setSelectedChildId(lastChildId);
                localStorage.setItem('selectedChildId', lastChildId);
            }
        }

    }, [childList, setUser]);

    if (isLoading) return <Spinner/>;

    return (
        <AppContext.Provider value={{
            user,
            setUser,
            pageTitle,
            setPageTitle,
            selectedChildId,
            setSelectedChildId,
            childList,
            setChildList,
            query,
            setQuery,
        }}>
            {children}
        </AppContext.Provider>
    );
};

export default AppContext;