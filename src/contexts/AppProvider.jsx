import { createContext, useState } from 'react';

export const AppContext = createContext(null);


export const AppProvider = ({ children }) => {
    const [user, setUser] = useState({ email: 'example@example.com', userId: '19' }); // 사용자 정보
    const [pageTitle, setPageTitle] = useState(''); // 화면 제목

    return (
        <AppContext.Provider value={{ user, setUser, pageTitle, setPageTitle }}>
            {children}
        </AppContext.Provider>
    );
};

export default AppContext;
