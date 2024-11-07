/* src/components/baby-diary/diary-calendar/DiaryCalendar.jsx */

import React, { useState } from 'react';
import './DiaryCalendar.css';
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, isSameMonth, isSameDay, isAfter } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { PATHS } from "../../../routes/paths.js";
import basic_profile from '../../../assets/img/basic_profile.png';

// Sample image data for specific dates
const imageDates = {
    '2024-11-01': basic_profile,
    '2024-11-03': basic_profile,
    '2024-11-0': basic_profile,
    '2024-11-05': basic_profile,
};

const Calendar = () => {
    const navigate = useNavigate();
    const today = new Date();
    const [currentMonth, setCurrentMonth] = React.useState(new Date());
    const [selectedDate, setSelectedDate] = useState(null); // 현재 선택된 날짜를 저장하는 상태

    // 이전 달로 이동하는 함수
    const handlePreviousMonth = () => {
        setCurrentMonth(prevMonth => addDays(prevMonth, -30));
    };

    // 다음 달로 이동하는 함수
    const handleNextMonth = () => {
        setCurrentMonth(prevMonth => addDays(prevMonth, 30));
    };

    // 오늘 날짜로 이동하는 함수
    const handleToday = () => {
        setCurrentMonth(new Date());
        setSelectedDate(null); // 선택된 날짜 초기화
    };

    const renderDays = () => {
        const days = ['일', '월', '화', '수', '목', '금', '토'];
        return days.map(day => <div key={day} className="day">{day}</div>);
    };

    const handleCalendarClick = (formattedDate) => {
        const inputDate = new Date(formattedDate);
        const today = new Date();
        if (isAfter(inputDate, today)) return; // 미래 날짜 클릭 방지

        // 날짜를 클릭하면 해당 날짜의 일기 URL로 이동
        setSelectedDate(formattedDate); // 선택된 날짜 업데이트
        navigate(`${PATHS.BABY_DIARY}/${formattedDate}`);
    };

    const renderDates = () => {
        const monthStart = startOfMonth(currentMonth);
        const monthEnd = endOfMonth(monthStart);
        const startDate = startOfWeek(monthStart, { weekStartsOn: 0 });
        const endDate = endOfWeek(monthEnd, { weekStartsOn: 0 });

        const dateCells = [];
        let day = startDate;

        while (day <= endDate) {
            const formattedDate = format(day, 'yyyy-MM-dd');
            const isInCurrentMonth = isSameMonth(day, currentMonth);
            const isToday = isSameDay(day, today);
            const isFuture = isAfter(day, today);
            const isSelected = formattedDate === selectedDate; // 현재 날짜가 선택된 날짜인지 확인
            const imageSrc = imageDates[formattedDate];

            dateCells.push(
                <div
                    key={formattedDate}
                    className={`date-cell ${isInCurrentMonth ? '' : 'outside-month'} ${isToday ? 'today' : ''} ${isSelected ? 'selected' : ''} ${isFuture ? 'future-date' : ''}`}
                    onClick={() => handleCalendarClick(formattedDate)}
                >
                    <span className="date-number">{format(day, 'd')}</span>
                    <div className="date-image-container">
                        {imageSrc ? (
                            <img src={imageSrc} alt="Event" className="date-image" />
                        ) : (
                            <div className="empty-date"></div>
                        )}
                    </div>
                </div>
            );
            day = addDays(day, 1);
        }
        return dateCells;
    };

    return (
        <div className="calendar-wrap">

            {/* 날짜 이동 */}
            <div className="date-navigator">
                <div className="nav-section">
                    <button className="nav-button" onClick={handlePreviousMonth}><i className="bi bi-chevron-left"></i></button>
                    <span className="current-date">{format(currentMonth, 'yyyy.MM')}</span>
                    <button className="nav-button" onClick={handleNextMonth}><i className="bi bi-chevron-right"></i></button>
                </div>
                <button className="today-button" onClick={handleToday}>오늘</button>
            </div>

            {/* 요일 */}
            <div className="calendar-grid weekdays">
                {renderDays()}
            </div>
            <div className="calendar-grid">
                {/* 날짜 */}
                {renderDates()}
            </div>
        </div>
    );
};

export default Calendar;