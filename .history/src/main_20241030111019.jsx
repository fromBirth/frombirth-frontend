//src/main.jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// 애플리케이션의 메인 컴포넌트인 App을 import
import App from './App.jsx'

// React 애플리케이션의 루트 DOM 요소에 App 컴포넌트를 렌더링
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
