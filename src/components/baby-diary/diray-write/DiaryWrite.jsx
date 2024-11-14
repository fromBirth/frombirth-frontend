/* src/components/baby-diary/diary-write/DiaryWrite.jsx */

import './DiaryWrite.css';
import { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { checkNull, checkOnlyNumber } from "../../../utils/Validator.js";
import { ValidateMessage } from "../../../utils/ValidateMessage.js";
import { PHOTO_RECORD_PHOTO_LIST, RECORD_CREATE } from "../../../routes/ApiPath.js";
import axios from "axios";
import useFileUpload from "../../../hooks/useFileUpload";
import AppContext from "../../../contexts/AppProvider.jsx";
import { PATHS } from "../../../routes/paths.js";

const DiaryWrite = () => {
    const navigate = useNavigate();
    const { date: dateParam } = useParams();
    const location = useLocation();
    const modifyData = location.state;
    const { setPageTitle, selectedChildId } = useContext(AppContext);

    const today = new Date();
    const todayDateString = today.toISOString().split('T')[0];
    const initialDate = modifyData?.recordDate || dateParam || todayDateString;

    const [date, setDate] = useState(initialDate);
    const [height, setHeight] = useState(modifyData?.height || '');
    const [weight, setWeight] = useState(modifyData?.weight || '');
    const [title, setTitle] = useState(modifyData?.title || '');
    const [content, setContent] = useState(modifyData?.content || '');
    const [isButtonActive, setIsButtonActive] = useState(false);

    const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];
    const dayOfWeek = daysOfWeek[new Date(date).getDay()];

    useEffect(() => {
        setPageTitle(`${date} (${dayOfWeek}) ${modifyData ? '수정' : '작성'}`);
    }, [date, dayOfWeek, setPageTitle]);

    useEffect(() => {
        setIsButtonActive(title.trim() && content.trim());
    }, [title, content]);

    const {
        files: uploadImages = [],
        previewUrls: uploadImagesPreviews = [],
        handleFileChange: handleImageChange,
        triggerFileInput: triggerImageInput,
        fileInputRef: imageInputRef,
        removeFile: removeImage
    } = useFileUpload([], 5, 'image');

    const {
        files: [uploadVideo] = [null],
        previewUrls: [uploadVideoPreview] = [null],
        handleFileChange: handleVideoChange,
        triggerFileInput: triggerVideoInput,
        fileInputRef: videoInputRef,
        removeFile: removeVideo
    } = useFileUpload([], 1, 'video');

    async function handleDiarySubmit(event) {
        event.preventDefault();

        if (checkNull(title) || checkNull(content)) return;

        if (!checkNull(height) && checkOnlyNumber(height)) {
            window.showToast('키는' + ValidateMessage.HAS_STR);
            return;
        }
        if (!checkNull(weight) && checkOnlyNumber(weight)) {
            window.showToast('무게는' + ValidateMessage.HAS_STR);
            return;
        }

        const recordDTO = {
            recordId: modifyData?.recordId || '',
            childId: selectedChildId,
            height,
            weight,
            title,
            content,
            recordDate: date,
        };

        const formData = new FormData();
        formData.append('recordDTO', new Blob([JSON.stringify(recordDTO)], { type: 'application/json' }));
        uploadImages.forEach(file => formData.append('images', file));
        if (uploadVideo) formData.append('video', uploadVideo);

        try {
            const response = await axios.post(RECORD_CREATE, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            window.showToast(modifyData ? '일기가 성공적으로 수정되었습니다.' : '일기가 성공적으로 등록되었습니다.');
            navigate(PATHS.BABY_DIARY.MAIN);
        } catch (error) {
            window.showToast(modifyData ? '일기 수정에 실패했습니다.' : '일기 등록에 실패했습니다.');
            console.error('Error:', error);
        }
    }

    return (
        <div className="container menu_diarywrite">
            <div className="section record-size">
                <label className="title"><span>키/몸무게</span></label>
                <div className="input-row">
                    <input
                        type="number" placeholder="50" min="0" max="200" aria-label="키 입력"
                        value={height} onChange={(e) => setHeight(e.target.value)}
                    />
                    <span>cm</span>
                    <input
                        type="number" placeholder="0.0" min="0" max="200" aria-label="몸무게 입력"
                        value={weight} onChange={(e) => setWeight(e.target.value)}
                    />
                    <span>kg</span>
                </div>
            </div>

            {modifyData == null ? (
                <>
                    <div className="section">
                        <label className="title"><span>사진</span></label>
                        <div className="upload-image-box">
                            {uploadImagesPreviews.map((preview, index) => (
                                <div className="upload-box" key={index}>
                                    <img src={preview} alt={`uploaded ${index}`} />
                                    <button
                                        type="button" onClick={() => removeImage(index)} className="remove-button"
                                    >
                                        <i className="bi bi-x-lg"></i>
                                    </button>
                                </div>
                            ))}
                            {uploadImages.length < 5 && (
                                <div className="upload-box add" onClick={triggerImageInput}>
                                    <span className="add-icon">+</span>
                                    <small className="upload-count">{uploadImages.length}/5</small>
                                </div>
                            )}
                            <input
                                style={{ display: 'none' }} accept="image/*" onChange={handleImageChange} type="file"
                                ref={imageInputRef} multiple
                            />
                        </div>
                    </div>

                    <div className="section">
                        <label className="title"><span>영상</span><small>발달장애 진단용</small></label>
                        {uploadVideoPreview == null ? (
                            <div className="upload-box add" aria-label="영상 업로드" onClick={triggerVideoInput}>
                                <span className="add-icon">+</span>
                                <small className="upload-count">0/1</small>
                            </div>
                        ) : (
                            <div className="upload-box">
                                <video width="100%" controls>
                                    <source src={uploadVideoPreview} type="video/mp4" />
                                </video>
                                <button
                                    type="button" onClick={() => removeVideo(0)} className="remove-button"
                                >
                                    <i className="bi bi-x-lg"></i>
                                </button>
                            </div>
                        )}
                        <input
                            style={{ display: 'none' }} accept="video/mp4" onChange={handleVideoChange} type="file"
                            ref={videoInputRef}
                        />
                    </div>
                </>
            ) : null}

            <div className="section">
                <label className="title"><span>일기 제목</span><span className="required">*</span></label>
                <input
                    type="text" className="input record-title" placeholder="한 줄 이내의 제목을 작성해주세요."
                    aria-label="일기 제목 입력" value={title} onChange={(e) => setTitle(e.target.value)}
                />
            </div>

            <div className="section record-content">
                <label className="title"><span>일기 내용</span><span className="required">*</span></label>
                <textarea
                    className="textarea record-content" rows="8" placeholder="일기 내용을 작성해주세요." maxLength="500"
                    aria-label="일기 내용 입력" value={content} onChange={(e) => setContent(e.target.value)}
                />
                <small className="content-len">{content.length}/500자</small>
            </div>

            <button
                className={`submit-btn ${isButtonActive ? 'active' : ''}`}
                aria-label={modifyData ? '일기 수정' : '일기 등록'}
                onClick={handleDiarySubmit}
                disabled={!isButtonActive}
            >
                {modifyData ? '일기 수정' : '일기 등록'}
            </button>
        </div>
    );
};

export default DiaryWrite;
