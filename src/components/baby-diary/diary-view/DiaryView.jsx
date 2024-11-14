import './DiaryView.css';
import { getDayOfWeek } from "../../../utils/Util.js";
import { useLocation, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import AppContext from "../../../contexts/AppProvider.jsx";
import axios from "axios";
import { RECORD_DELETE } from "../../../routes/ApiPath.js";
import {PATHS} from "../../../routes/paths.js";

const DiaryView = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const diary = location.state;
    const { setPageTitle } = useContext(AppContext);
    const [menuOpen, setMenuOpen] = useState(false);
    const [isThisWeek, setIsThisWeek] = useState(true);
    const [showModal, setShowModal] = useState(false); // 삭제 모달 상태
    const [selectedImage, setSelectedImage] = useState(null); // 선택된 사진

    useEffect(() => {
        if (diary?.recordDate) {
            const title = `${diary.recordDate} (${getDayOfWeek(diary.recordDate)})`;
            setPageTitle(title);

            // 현재 날짜와 이번 주 월요일 계산
            const today = new Date();
            const diaryDate = new Date(diary.recordDate);

            // 이번 주 월요일 계산
            const currentDay = today.getDay();
            const diff = currentDay === 0 ? -6 : 1 - currentDay;
            const monday = new Date(today);
            monday.setDate(today.getDate() + diff);
            monday.setHours(0, 0, 0, 0); // 시간을 자정으로 설정

            // 다음 주 월요일 계산
            const nextMonday = new Date(monday);
            nextMonday.setDate(monday.getDate() + 7);
            nextMonday.setHours(0, 0, 0, 0); // 시간을 자정으로 설정

            // 일기가 이번 주에 포함되는지 확인
            setIsThisWeek(diaryDate >= monday && diaryDate < nextMonday);
        }
    }, [diary?.recordDate, setPageTitle]);

    const handleOutsideClick = (event) => {
        if (!event.target.closest('.menu-dropdown') && !event.target.closest('.menu-icon')) {
            setTimeout(() => {
                setMenuOpen(false);
            }, 200);
        }
    };

    useEffect(() => {
        if (menuOpen) {
            document.addEventListener('click', handleOutsideClick);
        } else {
            document.removeEventListener('click', handleOutsideClick);
        }
        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, [menuOpen]);

    const handleEdit = (event) => {
        event.stopPropagation();
        setTimeout(() => {
            navigate(`${PATHS.BABY_DIARY.WRITE}/${diary.id}`, { state: diary });
        }, 200);
    };

    const handleDeleteConfirm = async () => {
        try {
            const response = await axios.delete(RECORD_DELETE.replace("{recordId}", diary.recordId));
            if (response.status === 204) {
                window.showToast("삭제 완료되었습니다.");
                setTimeout(() => {
                    navigate(-1); // 이전 화면으로 이동
                }, 200); // 200ms 지연 후 이동
            }
        } catch (error) {
            console.error("삭제 중 오류 발생:", error);
            window.showToast("삭제에 실패했습니다. 다시 시도해주세요.");
        } finally {
            setShowModal(false); // 모달 닫기
        }
    };

    const openImageModal = (image) => {
        setSelectedImage(image);
    };

    const closeImageModal = () => {
        setSelectedImage(null);
    };
    return (
        <div className="container entry-view">
            {/* 수정/삭제 버튼 */}
            {isThisWeek && ( // 이번 주가 아니면 더보기 메뉴를 표시하지 않음
                <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
                    <i className="bi bi-three-dots-vertical"></i>
                    {menuOpen && (
                        <div className="menu-dropdown">
                            <button onClick={handleEdit}>
                                <i className="bi bi-pencil"></i>
                                <span>일기 수정</span>
                            </button>
                            <button onClick={() => setShowModal(true)}>
                                <i className="bi bi-trash"></i>
                                <span>일기 삭제</span>
                            </button>
                        </div>
                    )}
                </div>
            )}
            {(diary.height || diary.weight) && (
                <div className="entry-size">
                    <div className="size-item">키 : {diary.height ? `${diary.height} cm` : '-'}</div>
                    <div className="size-item">몸무게 : {diary.weight ? `${diary.weight} kg` : '-'}</div>
                </div>
            )}
            <div className="entry-title">{diary.title}</div>
            <div className="entry-content">{diary.content}</div>
            <div className="photos">
                {diary.images?.map((image) => (
                    image.photoId &&
                    <img
                        src={image.url}
                        alt={"Photo " + image.photoId}
                        key={image.photoId}
                        onClick={() => openImageModal(image.url)} // 사진 클릭 이벤트
                    />
                ))}
            </div>

            {/* 사진 모달 */}
            {selectedImage && (
                <div className="modal-overlay" onClick={closeImageModal}>
                    <div className="modal-content image-modal">
                        <img src={selectedImage} alt="Selected" />
                    </div>
                </div>
            )}

            {/* 삭제 확인 모달 */}
            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2>일기를 삭제할까요?</h2>
                        <p>삭제한 글은 복원할 수 없어요.</p>
                        <div className="modal-buttons">
                            <button className="cancel-button" onClick={() => setShowModal(false)}>
                                아니요
                            </button>
                            <button className="confirm-button" onClick={handleDeleteConfirm}>
                                네, 삭제할래요
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DiaryView;
