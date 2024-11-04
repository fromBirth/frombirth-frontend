import './DiaryWrite.css';
import { useEffect, useRef, useState } from "react";
import { checkNull, checkOnlyNumber } from "../../../utils/Validator.js";
import { ValidateMessage } from "../../../utils/ValidateMessage.js";
import { RECORD_CREATE } from "../../../routes/ApiPath.js";
import axios from "axios";

const DiaryWrite = () => {
    const today = new Date();
    const todayDateString = today.toISOString().split('T')[0];
    const todayDate = todayDateString.split('-');
    const daysOfWeek = ['일', '월', '화', '수', '목', '금'];
    const dayOfWeek = daysOfWeek[today.getDay()];
    const [height, setHeight] = useState();
    const [weight, setWeight] = useState();
    const [title, setTitle] = useState();
    const [content, setContent] = useState();
    const [uploadImages, setUploadImages] = useState([]);
    const [uploadImagesTag, setUploadImagesTag] = useState([]);
    const [uploadVideo, setUploadVideo] = useState(null);

    const inputImage = useRef(null);
    const inputVideo = useRef(null);

    useEffect(() => {
        // 미리보기 URL 해제
        return () => {
            uploadImages.forEach(image => {
                URL.revokeObjectURL(image.preview);
            });
            if (uploadVideo) {
                URL.revokeObjectURL(uploadVideo.preview);
            }
        };
    }, [uploadImages, uploadVideo]);

    function handleInputImage() {
        inputImage.current.click();
    }

    function handleUploadImages() {
        if (inputImage.current.files && inputImage.current.files[0]) {
            const imageFile = inputImage.current.files[0];
            const preview = URL.createObjectURL(imageFile);

            setUploadImages(prev => [...prev, { file: imageFile, preview }]);
            setUploadImagesTag(prev => [
                ...prev,
                <div className="upload-box" key={prev.length}>
                    <img src={preview} alt={`uploaded ${prev.length}`} />
                </div>
            ]);
        }
    }

    function handleInputVideo() {
        inputVideo.current.click();
    }

    function handleUploadVideo() {
        if (inputVideo.current.files && inputVideo.current.files[0]) {
            const videoFile = inputVideo.current.files[0];
            const preview = URL.createObjectURL(videoFile);

            setUploadVideo({ file: videoFile, preview });
        }
    }

    async function handleDiarySubmit(event) {
        event.preventDefault();

        if (checkNull(height) || checkNull(weight) || checkNull(title) || checkNull(content)) {
            return;
        }
        if (checkOnlyNumber(height)) {
            alert('키는' + ValidateMessage.HAS_STR);
            return;
        }
        if (checkOnlyNumber(weight)) {
            alert('무게는' + ValidateMessage.HAS_STR);
            return;
        }

        // FormData 생성
        const formData = new FormData();
        formData.append('height', height);
        formData.append('weight', weight);
        formData.append('content', content);
        formData.append('title', title);
        formData.append('recordDate', todayDateString);  // RecordDTO에 맞춘 필드 이름

        // 이미지 파일 추가
        uploadImages.forEach(({ file }) => {
            formData.append('images', file);
        });

        // 비디오 파일 추가
        if (uploadVideo) {
            formData.append('video', uploadVideo.file);
        }

        try {
            const response = await axios.post(RECORD_CREATE, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            alert('일기가 성공적으로 등록되었습니다.');
            console.log('Response:', response.data);
        } catch (error) {
            alert('일기 등록에 실패했습니다.');
            console.error('Error:', error);
        }
    }

    return (
        <div className="container">
            <h2>{todayDate[1] + '/' + todayDate[2] + '(' + dayOfWeek + ')'} 일기 작성</h2>

            <div className="input-row">
                <input type="number" placeholder="50" min="0" max="200" aria-label="키 입력"
                       value={height} onChange={(e) => {setHeight(e.target.value)}}
                />
                <span>cm</span>
                <input type="number" placeholder="0.0" min="0" max="200" aria-label="몸무게 입력"
                       value={weight} onChange={(e) => {setWeight(e.target.value)}}
                />
                <span>kg</span>
            </div>

            <div className="upload-section">
                <label>사진</label>
                <div className="upload-image-box">
                    {uploadImagesTag}
                    {uploadImages.length >= 5 ?
                        '' :
                        <div className="upload-box" aria-label="사진 업로드" onClick={handleInputImage}>+</div>
                    }
                    <input style={{display: 'none'}} accept="image/*"
                           onChange={handleUploadImages} ref={inputImage} type="file"/>
                </div>
                <small>{uploadImages.length}/5</small>
            </div>

            <div className="upload-section">
                <label>영상 <small>(발달장애 진단용)</small></label>
                {uploadVideo == null ?
                    <div className="upload-box" aria-label="영상 업로드" onClick={handleInputVideo}>+</div>
                    :
                    <div className="upload-box">
                        <video width="100%" controls>
                            <source src={uploadVideo.preview} type="video/mp4" />
                        </video>
                    </div>
                }
                <input style={{display:'none'}} accept="video/mp4"
                       onChange={handleUploadVideo} ref={inputVideo} type="file"/>
            </div>

            <textarea className="textarea" rows="1" placeholder="일기 제목을 작성해주세요." aria-label="일기 제목 입력"
                      value={title} onChange={(e) => {setTitle(e.target.value)}} />

            <textarea className="textarea" rows="5" placeholder="일기를 작성해주세요."
                      maxLength="500" aria-label="일기 내용 입력"
                      value={content} onChange={(e) => {setContent(e.target.value)}} />
            <small>0/500자</small>

            <button className="submit-btn" aria-label="일기 등록" onClick={handleDiarySubmit}>등록하기</button>
        </div>
    );
};

export default DiaryWrite;
