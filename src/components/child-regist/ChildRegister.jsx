/* src/components/child-regist/ChildRegister.jsx */

import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // useParams 훅을 사용하여 URL에서 ID 가져오기
import './ChildRegister.css';
import {
    checkDate, checkHasSpace, checkHour, checkLength, checkMinute, checkMonth, checkNull, checkOnlyNumber
} from "../../utils/Validator.js";
import { ValidateMessage } from "../../utils/ValidateMessage.js";
import { REGEXP } from "../../utils/RegularExpression.js";
import {
    getAmPmHourMinuteByLocalTime,
    getLastDateByMonth, getSelectedChild,
    getYearMonthDateByLocalDate,
    numberAddZero
} from "../../utils/Util.js";
import axios from "axios";
import { CHILDREN_CREATE, CHILDREN_GET_CHILD } from '../../routes/ApiPath.js';
import AppContext from "../../contexts/AppProvider.jsx";
import basic_profile from '../../assets/img/basic_profile.png';
import useFileUpload from "../../hooks/useFileUpload";

const ChildRegister = () => {
    const { user, childList, setChildList, setPageTitle } = useContext(AppContext);

    const { childId } = useParams(); // URL에서 아이 ID 가져오기
    const limitNameLength = 2;
    const [inputName, setInputName] = useState('');
    const [inputBirthYear, setInputBirthYear] = useState('');
    const [inputBirthMonth, setInputBirthMonth] = useState('');
    const [inputBirthDate, setInputBirthDate] = useState('');
    const [inputGender, setInputGender] = useState('');
    const [inputBlood, setInputBlood] = useState('');
    const [inputAmPm, setInputAmPm] = useState('');
    const [inputHour, setInputHour] = useState('');
    const [inputMinute, setInputMinute] = useState('');
    const [inputHeight, setInputHeight] = useState('');
    const [inputWeight, setInputWeight] = useState('');
    const [isFormComplete, setIsFormComplete] = useState(false);

    const [datePlaceholder, setDatePlaceholder] = useState({
        year: '',
        month: '',
        date: '',
        hour: '',
        minute: ''
    });

    //이미지 처리용 커스텀 훅 사용
    const {
        files: profileImages,
        previewUrls: profilePreviews,
        handleFileChange,
        triggerFileInput,
        fileInputRef,
        loadPreviewFromUrl
    } = useFileUpload([], 1, 'image', basic_profile);

    useEffect(() => {
        // 필수 필드들이 모두 채워졌는지 확인
        const isComplete =
            inputName.trim() !== '' &&
            inputBirthYear.trim() !== '' &&
            inputBirthMonth.trim() !== '' &&
            inputBirthDate.trim() !== '' &&
            inputGender.trim() !== '' &&
            inputBlood.trim() !== '' &&
            inputAmPm.trim() !== '' &&
            inputHour.trim() !== '' &&
            inputMinute.trim() !== '';
        setIsFormComplete(isComplete);
    }, [
        inputName, inputBirthYear, inputBirthMonth, inputBirthDate,
        inputGender, inputBlood, inputAmPm, inputHour, inputMinute,
        inputHeight, inputWeight
    ]);

    // 수정 모드일 경우 데이터를 불러오는 useEffect
    useEffect(() => {
        if (childId) {
            // 아이 ID가 있을 때, 수정 모드로 데이터 불러오기
            setPageTitle('아이 정보 수정'); // 아이디가 있을 경우 제목을 '수정'으로 설정

            let selectedChild = getSelectedChild(childId, childList);
            setInputName(selectedChild.name);
            setInputGender(selectedChild.gender);
            setInputBlood(selectedChild.bloodType);
            setInputHeight(selectedChild.birthHeight);
            setInputWeight(selectedChild.birthWeight);
            loadPreviewFromUrl(selectedChild.profilePicture);

            let {year, month, date} = getYearMonthDateByLocalDate(selectedChild.birthDate);
            console.log(getYearMonthDateByLocalDate(selectedChild.birthDate));
            setInputBirthYear(year);
            setInputBirthMonth(month + '');
            setInputBirthDate(date + '');

            let {isAm, hour, minute} = getAmPmHourMinuteByLocalTime(selectedChild.birthTime);
            setInputAmPm(isAm);
            setInputHour(hour);
            setInputMinute(minute);

        } else {
            setPageTitle('아이 정보 등록'); // 아이디가 없을 경우 제목을 '등록'으로 설정
        }
    }, [childId, setPageTitle]);

    useEffect(() => {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const date = String(now.getDate()).padStart(2, '0');
        const hour = String(now.getHours()).padStart(2, '0');
        const minute = String(now.getMinutes()).padStart(2, '0');

        setDatePlaceholder({
            year,
            month,
            date,
            hour,
            minute
        });
    }, []);



    const validateInputName = () => {
        if (checkNull(inputName)) {
            return '이름을 ' + ValidateMessage.NO_INPUT;
        }
        if (!REGEXP.ONLY_ENG_AND_KOR.test(inputName.trim())) {
            return ValidateMessage.NAME_ENG_KOR;
        }
        if (checkLength(inputName, limitNameLength)) {
            return ValidateMessage.NAME_LENGTH_UNDER + ' (최소 ' + limitNameLength + '자)';
        }
        if (checkHasSpace(inputName)) {
            return '이름은 ' + ValidateMessage.HAS_SPACE;
        }

        return 'ok';
    }

    const validateInputBirthDate = (year, month, date) => {
        if (checkNull(year) || checkNull(month) || checkNull(date)) {
            return '생년월일을 ' + ValidateMessage.NO_INPUT;
        }
        if (checkOnlyNumber(year) || checkOnlyNumber(month) || checkOnlyNumber(date)) {
            return '생년월일은 ' + ValidateMessage.HAS_STR;
        }
        if (checkLength(year) || checkLength(month) || checkLength(date)) {
            return '생년월일은 ' + ValidateMessage.HAS_SPACE;
        }
        if (validateInputYear(year)) {
            return '유효한 출생연도를 입력해주세요.';
        }
        if (!checkMonth(month)) {
            return '월은 1~12 사이 값만 입력 가능합니다.';
        }
        if (checkDate(year, month, date)) {
            return '일은 1~' + getLastDateByMonth(month, year) + ' 사이 값만 입력 가능합니다.';
        }

        return 'ok';
    }
    const validateInputYear = (target) => {
        return target < 1900 || target > 2025;
    }

    const validateInputBirthTime = (inputHour, inputMinute) => {
        if (checkNull(inputHour) || checkNull(inputMinute)) {
            return '출생시간을 ' + ValidateMessage.NO_INPUT;
        }
        if (checkOnlyNumber(inputHour) || checkOnlyNumber(inputMinute)) {
            return '출생시간은 ' + ValidateMessage.HAS_STR;
        }
        if (checkLength(inputHour) || checkLength(inputMinute)) {
            return '출생시간은 ' + ValidateMessage.HAS_SPACE;
        }
        if (checkHour(inputHour)) {
            return '시간은 0~11 사이 값을 입력해주세요';
        }
        if (checkMinute(inputMinute)) {
            return '분은 0~59 사이 값을 입력해주세요';
        }

        return 'ok';
    }

    const validateInputBodySize = (inputSize) => {
        if (inputSize && checkOnlyNumber(inputSize)) {
            return '신체정보는 ' + ValidateMessage.HAS_STR;
        }
        if (inputSize && checkLength(inputSize)) {
            return '신체정보는 ' + ValidateMessage.HAS_SPACE;
        }

        return 'ok';
    }

    const validateInput = () => {
        // 오류 메시지를 담을 변수 선언
        let errorMessage = '';

        // 이름 검증
        if (validateInputName() !== 'ok') {
            errorMessage = validateInputName();
        }
        // 생년월일 검증
        else if (validateInputBirthDate(inputBirthYear, inputBirthMonth, inputBirthDate) !== 'ok') {
            errorMessage = validateInputBirthDate(inputBirthYear, inputBirthMonth, inputBirthDate);
        }
        // 출생시간 검증
        else if (validateInputBirthTime(inputHour, inputMinute) !== 'ok') {
            errorMessage = validateInputBirthTime(inputHour, inputMinute);
        }
        // 추가적인 검증은 필요에 따라 추가

        // else if ()

        if (errorMessage) {
            window.showToast(errorMessage); // 첫 번째 오류 메시지만 표시
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateInput()) {
            return;
        }

        const child = {
            userId: user.userId,
            name: inputName,
            birthDate: inputBirthYear + '-' + numberAddZero(inputBirthMonth, 2) + '-' + numberAddZero(inputBirthDate, 2),
            gender: inputGender,
            bloodType: inputBlood,
            birthTime: ((inputAmPm === 'AM') ? numberAddZero(inputHour, 2) : numberAddZero(parseInt(inputHour) + 12, 2)) + ':' + numberAddZero(inputMinute, 2) + ':00',
            birthHeight: inputHeight,
            birthWeight: inputWeight
        }

        const formData = new FormData();
        formData.append('childrenDTO', new Blob([JSON.stringify(child)], {type: 'application/json'}));
        formData.append('profile', profileImages[0]);

        console.log(child);
        console.log(profileImages[0]);
        for (const pair of formData.entries()) {
            console.log(pair[0] + ', ' + pair[1]);
        }

        try {
            // 서버에 POST 요청
            const response = await axios.post(CHILDREN_CREATE, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }, withCredentials: true
            });
            console.log(response.data);
        } catch (error) {
            console.error('Error:', error);
        }
    }

    return (
        <div className="container">
            <div className="profile-wrap">
                <div className="profile-pic">
                    {profilePreviews[0] && <img src={profilePreviews[0]} alt="프로필 이미지 미리보기" />}
                    <div className="camera-icon">
                        <button onClick={triggerFileInput}><i className="bi bi-camera-fill"></i></button>
                    </div>
                    <input style={{display: 'none'}} accept="image/*" onChange={handleFileChange} type="file" ref={fileInputRef}/>
                </div>
            </div>

            <form className="profile-edit-form">
                <label className="title">
                    <span>이름</span>
                    <span className="required">*</span>
                </label>
                <input
                    type="text"
                    id="name"
                    placeholder="이름을 입력해주세요."
                    required
                    onChange={(e) => setInputName(e.target.value)}
                    value={inputName}
                />

                <label className="title">
                    <span>생년월일</span>
                    <span className="required">*</span>
                </label>
                <div className="flex-row">
                    <div className="date-input_wrap">
                        <input
                            type="number"
                            placeholder={datePlaceholder.year}
                            min="1900"
                            max="2099"
                            required
                            onChange={(e) => setInputBirthYear(e.target.value)}
                            value={inputBirthYear}
                        />
                        <label>년</label>
                    </div>
                    <div className="date-input_wrap">
                        <input
                            type="number"
                            placeholder={datePlaceholder.month}
                            min="1"
                            max="12"
                            required
                            onChange={(e) => setInputBirthMonth(e.target.value)}
                            value={inputBirthMonth}
                        />
                        <label>월</label>
                    </div>
                    <div className="date-input_wrap">
                        <input
                            type="number"
                            placeholder={datePlaceholder.date}
                            min="1"
                            max="31"
                            required
                            onChange={(e) => setInputBirthDate(e.target.value)}
                            value={inputBirthDate}
                        />
                        <label>일</label>
                    </div>
                </div>

                <label className="title">
                    <span>성별</span>
                    <span className="required">*</span>
                </label>
                <div className="gender">
                    <input
                        type="radio"
                        id="male"
                        name="gender"
                        value="M"
                        required
                        checked={inputGender === 'M'}
                        onChange={(e) => setInputGender(e.target.value)}
                    />
                    <label htmlFor="male">
                        <i className="bi bi-gender-male"></i> 남자아이
                    </label>
                    <input
                        type="radio"
                        id="female"
                        name="gender"
                        value="W"
                        required
                        checked={inputGender === 'W'}
                        onChange={(e) => setInputGender(e.target.value)}
                    />
                    <label htmlFor="female">
                        <i className="bi bi-gender-female"></i> 여자아이
                    </label>
                </div>

                <label className="title">
                    <span>혈액형</span>
                    <span className="required">*</span>
                </label>
                <div className="blood-type">
                    <input
                        type="radio"
                        id="a"
                        name="blood"
                        required
                        value="A"
                        checked={inputBlood === 'A'}
                        onChange={(e) => setInputBlood(e.target.value)}
                    />
                    <label htmlFor="a">A형</label>
                    <input
                        type="radio"
                        id="b"
                        name="blood"
                        required
                        value="B"
                        checked={inputBlood === 'B'}
                        onChange={(e) => setInputBlood(e.target.value)}
                    />
                    <label htmlFor="b">B형</label>
                    <input
                        type="radio"
                        id="o"
                        name="blood"
                        required
                        value="O"
                        checked={inputBlood === 'O'}
                        onChange={(e) => setInputBlood(e.target.value)}
                    />
                    <label htmlFor="o">O형</label>
                    <input
                        type="radio"
                        id="ab"
                        name="blood"
                        required
                        value="AB"
                        checked={inputBlood === 'AB'}
                        onChange={(e) => setInputBlood(e.target.value)}
                    />
                    <label htmlFor="ab">AB형</label>
                </div>

                <label className="title">
                    <span>출생시간</span>
                    <span className="required">*</span>
                </label>
                <div className="flex-row">
                    <div className="birth-time">
                        <input
                            type="radio"
                            id="am"
                            name="birth-time"
                            required
                            value="AM"
                            checked={inputAmPm === 'AM'}
                            onChange={(e) => setInputAmPm(e.target.value)}
                        />
                        <label htmlFor="am">오전</label>
                        <input
                            type="radio"
                            id="pm"
                            name="birth-time"
                            required
                            value="PM"
                            checked={inputAmPm === 'PM'}
                            onChange={(e) => setInputAmPm(e.target.value)}
                        />
                        <label htmlFor="pm">오후</label>
                    </div>
                    <input
                        type="number"
                        id="hour"
                        placeholder={datePlaceholder.hour}
                        min="0"
                        max="12"
                        required
                        value={inputHour}
                        onChange={(e) => setInputHour(e.target.value)}
                    />
                    <label htmlFor="hour">시</label>
                    <input
                        type="number"
                        id="minute"
                        placeholder={datePlaceholder.minute}
                        min="0"
                        max="59"
                        required
                        value={inputMinute}
                        onChange={(e) => setInputMinute(e.target.value)}
                    />
                    <label htmlFor="minute">분</label>
                </div>

                <label className="title">
                    <span>출생 키/몸무게</span>
                </label>
                <div className="flex-row">
                    <input
                        type="number"
                        id="length"
                        placeholder="50.0"
                        required
                        value={inputHeight}
                        onChange={(e) => setInputHeight(e.target.value)}
                    />
                    <label htmlFor="length">cm</label>
                    <input
                        type="number"
                        id="weight"
                        placeholder="3.5"
                        required
                        value={inputWeight}
                        onChange={(e) => setInputWeight(e.target.value)}
                    />
                    <label htmlFor="weight">kg</label>
                </div>

                <button type="submit" onClick={(e) => handleSubmit(e)}
                        className={`submit-btn ${isFormComplete ? 'active' : ''}`}>
                    {childId ? '수정하기' : '등록하기'}
                </button>
            </form>

        </div>
    );
};

export default ChildRegister;
