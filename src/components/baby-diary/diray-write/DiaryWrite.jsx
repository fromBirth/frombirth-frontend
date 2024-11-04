import './DiaryWrite.css';
import {useEffect, useRef, useState} from "react";
import {checkNull, checkOnlyNumber} from "../../../utils/Validator.js";
import {ValidateMessage} from "../../../utils/ValidateMessage.js";
import {RECORD_CREATE} from "../../../routes/ApiPath.js";
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
    const [uploadImagesTag, setUploadImagesTag] = useState();
    const [uploadVideo, setUploadVideo] = useState(null);

    const inputImage = useRef(null);
    const inputVideo = useRef(null);

    useEffect(() => {
        setUploadImagesTag(uploadImages.map((image, index) => (
            <div className="upload-box" key={index}>
                <img src={image} alt={`uploaded ${index}`} />
            </div>
        )));
    }, [uploadImages]);

    function handleInputImage() {
        inputImage.current.click();
    }

    function handleUploadImages() {
        if (inputImage.current.files != null) {
            setUploadImages(prev => [...prev, URL.createObjectURL(inputImage.current.files[0])]);
        }
    }

    function handleInputVideo() {
        inputVideo.current.click();
    }

    function handleUploadVideo() {
        if (inputVideo.current.files != null) {
            setUploadVideo(URL.createObjectURL(inputVideo.current.files[0]));
        }
    }

    function handleDiarySubmit(event) {
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

        const diary = {
            height: height,
            weight: weight,
            title: title,
            content: content,
            recordDate: todayDateString
        }

        let {data} = axios.post(RECORD_CREATE, {diary, uploadImages, uploadVideo});


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
                        <video width="100%">
                            <source src={uploadVideo} />
                        </video>
                    </div>
                }
                <input style={{display:'none'}} accept="video/mp4"
                       onChange={handleUploadVideo} ref={inputVideo} type="file"/>
            </div>

            <textarea className="textarea" rows="1" placeholder="일기 제목을 작성해주세요." aria-label="일기 제목 입력"
                      value={title} onChange={(e) => {setTitle(e.target.value)}}>

            </textarea>
            <textarea className="textarea" rows="5" placeholder="일기를 작성해주세요."
                      maxLength="500" aria-label="일기 내용 입력"
                      value={content} onChange={(e) => {setContent(e.target.value)}}>
            </textarea>
            <small>0/500자</small>

            <button className="submit-btn" aria-label="일기 등록" onClick={e => handleDiarySubmit(e)}>등록하기</button>
        </div>
    );
};

export default DiaryWrite;
