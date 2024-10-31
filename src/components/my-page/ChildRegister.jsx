import { useState } from 'react';
import './ChildRegister.css';
import {
    checkDate,
    checkHasSpace,
    checkHour,
    checkLength, checkMinute,
    checkMonth,
    checkNull,
    checkOnlyNumber
} from "../../utils/Validator.js";
import { ValidateMessage } from "../../utils/ValidateMessage.js";
import { REGEXP } from "../../utils/RegularExpression.js";
import { getLastDateByMonth, numberAddZero } from "../../utils/Util.js";
import axios from "axios";
import { CHILDREN_CREATE } from "../../routes/ApiPath.js";

const MyPage = () => {
    const limitNameLength = 2;
    const [inputName, setInputName] = useState('');
    const [inputBirthYear, setInputBirthYear] = useState('');
    const [inputBirthMonth, setInputBirthMonth] = useState('');
    const [inputBirthDate, setInputBirthDate] = useState('');
    const [inputGender, setInputGender] = useState('M');
    const [inputBlood, setInputBlood] = useState('');
    const [inputAmPm, setInputAmPm] = useState('AM');
    const [inputHour, setInputHour] = useState('');
    const [inputMinute, setInputMinute] = useState('');
    const [inputHeight, setInputHeight] = useState('');
    const [inputWeight, setInputWeight] = useState('');

    const validateInputName = () => {
        if (checkNull(inputName)) {
            return '이름을 ' + ValidateMessage.NO_INPUT;
        }
        if (!REGEXP.ONLY_ENG_AND_KOR.test(inputName.trim())) {
            return ValidateMessage.NAME_ENG_KOR;
        }
        if (checkLength(inputName, limitNameLength)) {
            return ValidateMessage.NAME_LENGTH_UNDER + ' 최소 ' + limitNameLength + '자';
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
        if (checkNull(inputSize)) {
            return '신체정보를 ' + ValidateMessage.NO_INPUT;
        }
        if (checkOnlyNumber(inputSize)) {
            return '신체정보는 ' + ValidateMessage.HAS_STR;
        }
        if (checkLength(inputSize)) {
            return '신체정보는 ' + ValidateMessage.HAS_SPACE;
        }

        return 'ok';
    }

    const validateInput = () => {
        const checkResultSet = new Set();
        checkResultSet.add(validateInputName());
        checkResultSet.add(validateInputBirthDate(inputBirthYear, inputBirthMonth, inputBirthDate));
        checkResultSet.add(validateInputBirthTime(inputHour, inputMinute));
        checkResultSet.add(validateInputBodySize(inputHeight));
        checkResultSet.add(validateInputBodySize(inputWeight));

        checkResultSet.delete('ok');
        if (checkResultSet.size >= 1) {
            // checkResultSet.forEach(message => alert(message));
            checkResultSet.forEach(message => window.showToast(message));
            return false;
        }
        return true;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateInput()) {
            return;
        }

        const child = {
            name: inputName,
            birthDate: inputBirthYear + '-' + numberAddZero(inputBirthMonth, 2) + '-' + numberAddZero(inputBirthDate, 2),
            gender: inputGender,
            bloodType: inputBlood,
            birthTime: (inputAmPm === 'AM' ? numberAddZero(inputHour, 2) : inputHour + 12) + ':' + numberAddZero(inputMinute, 2) + ':00',
            birthHeight: inputHeight,
            birthWeight: inputWeight
        }

        let { data } = axios.post(CHILDREN_CREATE, child);
        console.log(data);
    }

    return (
        <div className="container">
            <h1>아이 등록하기</h1>
            <div className="profile-pic">
                <img src="profile-placeholder.png" alt="Profile Picture" />
            </div>

            <form>
                <label htmlFor="name"><span>이름</span><span>*</span></label>
                <input type="text" id="name" placeholder="이름을 입력해주세요." required
                    onChange={e => setInputName(e.target.value)} value={inputName} />

                <label><span>생년월일</span><span>*</span></label>
                <div className="flex-row">
                    <input type="number" placeholder="YYYY" min="1900" max="2099" required
                        onChange={e => setInputBirthYear(e.target.value)}
                        value={inputBirthYear} />
                    <input type="number" placeholder="MM" min="1" max="12" required
                        onChange={e => setInputBirthMonth(e.target.value)}
                        value={inputBirthMonth} />
                    <input type="number" placeholder="DD" min="1" max="31" required
                        onChange={e => setInputBirthDate(e.target.value)}
                        value={inputBirthDate} />
                </div>

                <label><span>성별</span><span>*</span></label>
                <div className="gender">
                    <input type="radio" id="male" name="gender" value="M" required checked={inputGender === 'M'}
                        onChange={e => setInputGender(e.target.value)} />
                    <label htmlFor="male">남자아이</label>
                    <input type="radio" id="female" name="gender" value="W" required checked={inputGender === 'W'}
                        onChange={e => setInputGender(e.target.value)} />
                    <label htmlFor="female">여자아이</label>
                </div>

                <label><span>혈액형</span><span>*</span></label>
                <div className="blood-type">
                    <input type="radio" id="a" name="blood" required
                        value="a" checked={inputBlood === 'a'}
                        onChange={e => setInputBlood(e.target.value)}
                    />
                    <label htmlFor="a">A형</label>
                    <input type="radio" id="b" name="blood" required
                        value="b" checked={inputBlood === 'b'}
                        onChange={e => setInputBlood(e.target.value)}
                    />
                    <label htmlFor="b">B형</label>
                    <input type="radio" id="o" name="blood" required
                        value="o" checked={inputBlood === 'o'}
                        onChange={e => setInputBlood(e.target.value)}
                    />
                    <label htmlFor="o">O형</label>
                    <input type="radio" id="ab" name="blood" required
                        value="ab" checked={inputBlood === 'ab'}
                        onChange={e => setInputBlood(e.target.value)}
                    />
                    <label htmlFor="ab">AB형</label>
                    <input type="radio" id="rh-a" name="blood" required
                        value="rh-a" checked={inputBlood === 'rh-a'}
                        onChange={e => setInputBlood(e.target.value)}
                    />
                    <label htmlFor="rh-a">Rh-A형</label>
                    <input type="radio" id="rh-b" name="blood" required
                        value="rh-b" checked={inputBlood === 'rh-b'}
                        onChange={e => setInputBlood(e.target.value)}
                    />
                    <label htmlFor="rh-b">Rh-B형</label>
                    <input type="radio" id="rh-o" name="blood" required
                        value="rh-o" checked={inputBlood === 'rh-o'}
                        onChange={e => setInputBlood(e.target.value)}
                    />
                    <label htmlFor="rh-o">Rh-O형</label>
                    <input type="radio" id="rh-ab" name="blood" required
                        value="rh-ab" checked={inputBlood === 'rh-ab'}
                        onChange={e => setInputBlood(e.target.value)}
                    />
                    <label htmlFor="rh-ab">Rh-AB형</label>
                </div>

                <label><span>출생시간</span><span>*</span></label>
                <div className="birth-time">
                    <input type="radio" id="am" name="birth-time" required
                        value="AM" checked={inputAmPm === 'AM'}
                        onChange={e => setInputAmPm(e.target.value)}
                    />
                    <label htmlFor="am">오전</label>
                    <input type="radio" id="pm" name="birth-time" required
                        value="PM" checked={inputAmPm === 'PM'}
                        onChange={e => setInputAmPm(e.target.value)}
                    />
                    <label htmlFor="pm">오후</label>
                </div>
                <div className="flex-row">
                    <input type="number" id="hour" placeholder="HH" min="0" max="23" required
                        value={inputHour} onChange={e => setInputHour(e.target.value)} />
                    <label htmlFor="hour">시</label>
                    <input type="number" id="minute" placeholder="MM" min="0" max="59" required
                        value={inputMinute} onChange={e => setInputMinute(e.target.value)} />
                    <label htmlFor="minute">분</label>
                </div>

                <label><span>출생 키/몸무게</span><span>*</span></label>
                <div className="flex-row">
                    <input type="number" id="length" placeholder="cm" required
                        value={inputHeight} onChange={e => setInputHeight(e.target.value)}
                    />
                    <label htmlFor="length">cm</label>
                    <input type="number" id="weight" placeholder="kg" required
                        value={inputWeight} onChange={e => setInputWeight(e.target.value)}
                    />
                    <label htmlFor="weight">kg</label>
                </div>

                <button type="submit" className="submit-btn" onClick={e => handleSubmit(e)}>
                    등록하기
                </button>
            </form>
        </div>
    );
};

export default MyPage;
