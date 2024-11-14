import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';

dotenv.config(); // .env 파일을 불러와 process.env에 환경 변수를 설정합니다.

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    historyApiFallback: true, // React Router의 브라우저 새로고침 지원
    proxy: {
      '/api': {
        target: process.env.VITE_SPRING_BASE_URL, // Spring Boot 서버 주소
        changeOrigin: true,
        secure: false,  // HTTPS가 아닌 경우 secure를 false로 설정
      },
      '/auth': {
        target: process.env.VITE_SPRING_BASE_URL, // 백엔드 서버 주소
        changeOrigin: true,
        secure: false,
      },
    },
    host: '0.0.0.0',  // 모든 네트워크 인터페이스에서 접근 가능하게 설정
    port: 5173,       // 기본 포트 설정
    strictPort: true // 포트번호 사용시 자동 다른 포트 시도 방지
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: () => 'everything.js', // 코드 분할 없이 모든 파일을 하나로 번들링
        entryFileNames: 'everything.js', // 번들링된 파일 이름
      },
    },
  },
});
