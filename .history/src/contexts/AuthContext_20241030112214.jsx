/* src/contexts/AuthContext.jsx */

import { createContext, useState } from 'react';

// Context 생성
export const AuthContext = createContext();

// Context Provider 컴포넌트
export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // 로그인/로그아웃 상태 변경 함수
    const toggleAuth = () => {
        setIsAuthenticated(!isAuthenticated);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, toggleAuth }}>
            {children}
        </AuthContext.Provider>
    );
};
