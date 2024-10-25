import { BrowserRouter as Router, Link } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import AppRouter from './routes/AppRouter'; // 라우팅 설정을 불러옴


function App() {
    return (
        <AuthProvider>
            <Router>
                <nav>
                    <ul>
                        <li><Link to="/">Main</Link></li>
                        <li><Link to="/mypage">mypage</Link></li>
                        <li><Link to="/babydiary">babydiary</Link></li>
                        <li><Link to="/growthanalysis">growthanalysis</Link></li>
                        <li><Link to="/weeklyreport">weeklyreport</Link></li>

                    </ul>
                </nav>
                <AppRouter/> {/* 라우팅 설정 */}
            </Router>
        </AuthProvider>
    );
}

export default App;
