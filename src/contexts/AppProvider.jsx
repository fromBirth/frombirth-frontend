import {createContext, useEffect, useState} from 'react';
import axios from "axios";
import {CHILDREN_LIST_BY_USER} from "../routes/ApiPath.js";
import Spinner from "../components/common/Spinner.jsx";

export const AppContext = createContext(null);


export const AppProvider = ({ children }) => {
    const [user, setUser] = useState({ email: 'example@example.com', userId: '19' }); // 사용자 정보
    const [pageTitle, setPageTitle] = useState(''); // 화면 제목
    const [selectedChildId, setSelectedChildId] = useState(69);
    const [childList, setChildList] = useState([]);
    const [isLoading, setIsLoading] = useState(true); // 로딩 상태 추가
    const [query, setQuery] = useState("");

    // 아이 리스트 저장
    useEffect(() => {
        const fetchChildList = async () => {
            try {
                const {data} = await axios.get(CHILDREN_LIST_BY_USER + user.userId);
                setChildList(data);
            } finally {
                setIsLoading(false);
            }
        };
        fetchChildList();
    }, [user.userId]);

    useEffect(() => {
        if (childList.length < 1) return;

        if (!localStorage.getItem('selectedChildId') || !childList.find((item) => item.childId === localStorage.getItem('selectedChildId'))) {
            const lastChildId = childList[childList.length - 1]?.childId;
            if (lastChildId) {
                setSelectedChildId(lastChildId);
            }
        }

    }, [childList, setUser]);

    if (isLoading || !user || childList.length === 0) return <Spinner/>;

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
