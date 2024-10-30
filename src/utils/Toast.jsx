/* src/utils/Toast.jsx */

import { useEffect, useState, useCallback } from 'react';

let toastId = 0;
let toastTimeout; // 타이머를 관리하는 변수 추가

const Toast = () => {
    const [toast, setToast] = useState(null); // 단일 토스트 관리

    // 🔴 showToast 함수를 useCallback으로 정의하여 토스트 추가
    const showToast = useCallback((message, type = 'check', duration = 2000) => {

        const id = toastId++;
        
        // 기존 타이머가 있을 경우 클리어
        if (toastTimeout) {
            clearTimeout(toastTimeout);
        }

        // 새로운 토스트 설정
        setToast({ id, message, type, duration });

        // duration 후에 토스트 제거
        toastTimeout = setTimeout(() => {
            setToast(null); // 토스트 메시지 제거
        }, duration);
    }, []);

    // 🔴 전역으로 showToast 함수 설정
    useEffect(() => {
        window.showToast = showToast; // 전역 함수로 설정 (어디서든 showToast 호출 가능)

        // 컴포넌트가 언마운트될 때 타이머 정리
        return () => clearTimeout(toastTimeout);
    }, [showToast]);

    // 🔴 화면에 단일 토스트 표시
    return (
        <div className="toast-container">
            {toast && (
                <div key={toast.id} className={`toast toast-${toast.type}`}>
                    {toast.message}
                </div>
            )}
        </div>
    );
};

export default Toast;