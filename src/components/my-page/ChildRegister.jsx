import React from 'react';
import './ChildRegister.css';

const MyPage = () => {
    return (
        <div className="container">
            <h1>아이 등록하기</h1>
            <div className="profile-pic">
                <img src="profile-placeholder.png" alt="Profile Picture" />
            </div>

            <form>
                <label htmlFor="name">이름*</label>
                <input type="text" id="name" placeholder="이름을 입력해주세요." required />

                <label>생년월일*</label>
                <div className="flex-row">
                    <input type="number" placeholder="YYYY" min="1900" max="2099" required />
                    <input type="number" placeholder="MM" min="1" max="12" required />
                    <input type="number" placeholder="DD" min="1" max="31" required />
                </div>

                <label>성별*</label>
                <div className="gender">
                    <input type="radio" id="male" name="gender" required />
                    <label htmlFor="male">남자아이</label>
                    <input type="radio" id="female" name="gender" required />
                    <label htmlFor="female">여자아이</label>
                </div>

                <label>혈액형*</label>
                <div className="blood-type">
                    <input type="radio" id="a" name="blood" required />
                    <label htmlFor="a">A형</label>
                    <input type="radio" id="b" name="blood" required />
                    <label htmlFor="b">B형</label>
                    <input type="radio" id="o" name="blood" required />
                    <label htmlFor="o">O형</label>
                    <input type="radio" id="ab" name="blood" required />
                    <label htmlFor="ab">AB형</label>
                </div>

                <label>출생시간*</label>
                <div className="birth-time">
                    <input type="radio" id="am" name="birth-time" required />
                    <label htmlFor="am">오전</label>
                    <input type="radio" id="pm" name="birth-time" required />
                    <label htmlFor="pm">오후</label>
                </div>
                <div className="flex-row">
                    <input type="number" placeholder="HH" min="0" max="23" required />
                    <input type="number" placeholder="MM" min="0" max="59" required />
                </div>

                <label>출생 키/몸무게</label>
                <div className="flex-row">
                    <input type="number" placeholder="cm" required />
                    <input type="number" placeholder="kg" required />
                </div>

                <button type="submit" className="submit-btn">등록하기</button>
            </form>
        </div>
    );
};

export default MyPage;
