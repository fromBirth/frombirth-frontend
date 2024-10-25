import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    historyApiFallback: true, // React Router의 브라우저 새로고침 지원
    proxy: {
      '/api': {
        target: 'http://localhost:8181', // Spring Boot 서버 주소
        changeOrigin: true,
        secure: false,  // HTTPS가 아닌 경우 secure를 false로 설정
      },
    },
    host: '0.0.0.0',  // 모든 네트워크 인터페이스에서 접근 가능하게 설정
    port: 5173,       // 기본 포트 설정
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: () => 'everything.js', // 코드 분할 없이 모든 파일을 하나로 번들링
        entryFileNames: 'everything.js', // 번들링된 파일 이름
      },
    },
  },
})
