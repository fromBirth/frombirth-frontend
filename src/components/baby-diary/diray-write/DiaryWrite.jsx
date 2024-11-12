/* src/components/baby-diary/diary-write/DiaryWrite.jsx */

import './DiaryWrite.css';
import { useState, useEffect, useContext } from "react";
import {useNavigate, useParams} from 'react-router-dom';
import { checkNull, checkOnlyNumber } from "../../../utils/Validator.js";
import { ValidateMessage } from "../../../utils/ValidateMessage.js";
import { RECORD_CREATE } from "../../../routes/ApiPath.js";
import axios from "axios";
import useFileUpload from "../../../hooks/useFileUpload";
import AppContext from "../../../contexts/AppProvider.jsx";
import {PATHS} from "../../../routes/paths.js";

const DiaryWrite = () => {
    const { date: dateParam } = useParams(); // URL에서 date 파라미터 가져오기
    const { setPageTitle, selectedChildId } = useContext(AppContext); // setPageTitle 가져오기

    // dateParam이 있으면 해당 날짜를, 없으면 오늘 날짜로 설정
    const today = new Date();
    const todayDateString = today.toISOString().split('T')[0];
    const initialDate = dateParam || todayDateString;

    const [date, setDate] = useState(initialDate); // 작성 날짜 상태 설정
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [isButtonActive, setIsButtonActive] = useState(false); // 버튼 활성화 상태

    const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];
    const dayOfWeek = daysOfWeek[new Date(date).getDay()]; // 요일 계산

    const navigate = useNavigate();

    // 페이지 타이틀 설정 useEffect
    useEffect(() => {
        setPageTitle(`${date} (${dayOfWeek})`);
    }, [date, dayOfWeek, setPageTitle]);

    // 제목과 내용 작성 상태에 따라 버튼 활성화
    useEffect(() => {
        if (title.trim() && content.trim()) {
            setIsButtonActive(true);
        } else {
            setIsButtonActive(false);
        }
    }, [title, content]);

    // 이미지 및 비디오 파일 업로드 훅 설정
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

        if (checkNull(title) || checkNull(content)) {
            return;
        }
        if (!checkNull(height) && checkOnlyNumber(height)) {
            alert('키는' + ValidateMessage.HAS_STR);
            return;
        }
        if (!checkNull(weight) && checkOnlyNumber(weight)) {
            alert('무게는' + ValidateMessage.HAS_STR);
            return;
        }

        const recordDTO = {
            childId: selectedChildId,
            height: height,
            weight: weight,
            title: title,
            content: content,
            recordDate: date // 사용자가 선택한 날짜
        };

        // FormData 생성
        const formData = new FormData();
        formData.append('recordDTO', new Blob([JSON.stringify(recordDTO)], { type: 'application/json' }));

        // 이미지 파일 추가
        uploadImages.forEach(file => {
            formData.append('images', file);
        });

        console.log(123);
        // 비디오 파일 추가
        if (uploadVideo) {
            formData.append('video', uploadVideo);
        }

        try {
            console.log(1234);
            const response = await axios.post(RECORD_CREATE, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            alert('일기가 성공적으로 등록되었습니다.');
            console.log('Response:', response.data);
            navigate(PATHS.BABY_DIARY);
        } catch (error) {
            alert('일기 등록에 실패했습니다.');
            console.error('Error:', error);
        }
    }

    return (
        <div className="container menu_diarywrite">
            <div className="section record-size">
                <label className="title"><span>키/몸무게</span></label>
                <div className="input-row">
                    <input type="number" placeholder="50" min="0" max="200" aria-label="키 입력"
                        value={height} onChange={(e) => setHeight(e.target.value)}
                    />
                    <span>cm</span>
                    <input type="number" placeholder="0.0" min="0" max="200" aria-label="몸무게 입력"
                        value={weight} onChange={(e) => setWeight(e.target.value)}
                    />
                    <span>kg</span>
                </div>
            </div>

            <div className="section">
                <label className="title"><span>사진</span></label>
                <div className="upload-image-box">
                    {uploadImagesPreviews.map((preview, index) => (
                        <div className="upload-box" key={index}>
                            <img src={preview} alt={`uploaded ${index}`} />
                            <button type="button" onClick={() => removeImage(index)} className="remove-button">×</button>
                        </div>
                    ))}
                    {uploadImages.length < 5 && (
                        <div className="upload-box add" onClick={triggerImageInput}>
                            <span className="add-icon">+</span>
                            <small className="upload-count">{uploadImages.length}/5</small>
                        </div>
                    )}
                    <input style={{ display: 'none' }} accept="image/*" onChange={handleImageChange} type="file" ref={imageInputRef} multiple />
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
                        <button type="button" onClick={() => removeVideo(0)} className="remove-button">×</button>
                    </div>
                )}
                <input style={{ display: 'none' }} accept="video/mp4" onChange={handleVideoChange} type="file" ref={videoInputRef} />
            </div>

            <div className="section">
                <label className="title"><span>일기 제목</span><span className="required">*</span></label>
                <input
                    type="text"
                    className="input record-title"
                    placeholder="한 줄 이내의 제목을 작성해주세요."
                    aria-label="일기 제목 입력"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>

            <div className="section record-content">
                <label className="title"><span>일기 내용</span><span className="required">*</span></label>
                <textarea className="textarea record-content" rows="8" placeholder="일기 내용을 작성해주세요." maxLength="500" aria-label="일기 내용 입력"
                    value={content} onChange={(e) => setContent(e.target.value)}
                />
                <small className="content-len">{content.length}/500자</small>
            </div>

            <button className={`submit-btn ${isButtonActive ? 'active' : ''}`} aria-label="일기 등록" onClick={handleDiarySubmit} disabled={!isButtonActive}>등록하기</button>
        </div >
    );
};

export default DiaryWrite;
