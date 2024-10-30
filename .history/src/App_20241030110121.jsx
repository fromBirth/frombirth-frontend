//src/App.jsx
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import AppRouter from './routes/AppRouter'; // 라우팅 설정을 불러옴

function App() {
    return (
        <AuthProvider>
            <Router>
                <AppRouter/> {/* 라우팅 설정 */}
            </Router>
        </AuthProvider>
    );
}

export default App;
