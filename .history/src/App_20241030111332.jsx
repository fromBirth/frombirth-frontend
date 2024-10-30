/* src/App.jsx */

// 전체 애플리케이션에 라우팅 기능을 제공하는 BrowserRouter를 import
import { BrowserRouter as Router } from 'react-router-dom';
// 전역적으로 인증 상태를 관리하기 위해 AuthProvider를 import
import { AuthProvider } from './contexts/AuthContext';
// 애플리케이션의 전체 라우팅 구성을 위한 AppRouter를 import
import AppRouter from './routes/AppRouter'; // 라우팅 설정을 불러옴

// App 컴포넌트는 애플리케이션의 최상위 컴포넌트로, 인증과 라우팅을 관리
function App() {
    return (
        <AuthProvider>  {/* 인증 컨텍스트 제공 */}
            <Router>  {/* 라우팅 제공 */}
                <AppRouter /> {/* 전체 라우팅 설정 */}
            </Router>
        </AuthProvider>
    );
}

// App 컴포넌트를 기본으로 내보내기
export default App;
