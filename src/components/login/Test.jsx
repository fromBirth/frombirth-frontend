import './Login.css';
import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import AppContext from '../../contexts/AppProvider.jsx';
import axios from "axios";
import { CHILDREN_LIST_BY_USER } from "../../routes/ApiPath.js";

function Test() {
    const navigate = useNavigate();
    const { setUser, setChildList, setSelectedChildId } = useContext(AppContext); // Context에서 필요한 상태와 함수를 가져옴

    // testLogin: 고정된 부모 ID를 사용하여 자녀 리스트를 가져옴
    const testLogin = async () => {
        console.log('Test login started...');
        try {
            // 고정된 부모 정보 설정
            const testUser = {
                userId: 32, // 고정된 부모 ID 🚩
                email: 'testuser@example.com', // 테스트용 이메일
            };
            console.log('Setting user:', testUser);
            setUser(testUser);

            // 부모 ID를 사용하여 자녀 리스트 가져오기
            console.log(`Fetching child list for userId: ${testUser.userId}`);
            const response = await axios.get(CHILDREN_LIST_BY_USER + testUser.userId);
            const childList = response.data;

            console.log('Child list fetched successfully:', childList);

            // 자녀 리스트 상태 및 로컬 스토리지에 저장
            setChildList(childList);
            console.log('Child list state updated');
            saveChildId(childList);

            console.log("Test login successful:", testUser, childList);

            // 대시보드로 이동
            console.log('Navigating to /dashboard');
            navigate("/dashboard");
        } catch (error) {
            console.error('Error fetching child list:', error);
        }
    };

    const saveChildId = (childList) => {
        console.log('Saving selectedChildId...');
        if (childList.length < 1) {
            console.log('No children found, skipping saveChildId.');
            return;
        }

        const isUserChild = childList.find((item) => item.childId === Number(localStorage.getItem('selectedChildId')));

        if (isUserChild) {
            console.log('Found user-selected child:', isUserChild);
            setSelectedChildId(isUserChild.childId);
        }

        if (!localStorage.getItem('selectedChildId') || !isUserChild) {
            const lastChildId = childList[childList.length - 1]?.childId;
            if (lastChildId) {
                console.log('No previous selectedChildId or not a user’s child. Setting to last child:', lastChildId);
                setSelectedChildId(lastChildId);
                localStorage.setItem('selectedChildId', lastChildId);
            }
        }
        console.log('Selected childId saved:', localStorage.getItem('selectedChildId'));
    };

    // useEffect를 사용하여 컴포넌트가 렌더링될 때 testLogin 실행
    useEffect(() => {
        testLogin();
    }, []); // 빈 배열로 설정하여 처음 렌더링 시 한 번만 실행

    return (
        <div className="login-wrap">
            <p>자동 로그인 중...</p>
        </div>
    );
}

export default Test;
