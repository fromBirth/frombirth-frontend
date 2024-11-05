import React from 'react';
import './DiaryCalendar.css';
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, isSameMonth, isSameDay } from 'date-fns';

// Sample image data for specific dates
const imageDates = {
    '2024-10-03': 'path/to/image1.png',
    '2024-10-06': 'path/to/image2.png',
    '2024-10-11': 'path/to/image3.png',
    '2024-10-12': 'path/to/image4.png',
};

const Calendar = () => {
    const today = new Date();
    const [currentMonth, setCurrentMonth] = React.useState(new Date());

    const handlePreviousMonth = () => {
        setCurrentMonth(prevMonth => addDays(prevMonth, -30));
    };

    const handleNextMonth = () => {
        setCurrentMonth(prevMonth => addDays(prevMonth, 30));
    };

    const renderHeader = () => (
        <div className="header">
            <button onClick={handlePreviousMonth}>◀</button>
            <span>{format(currentMonth, 'yyyy.MM')}</span>
            <button onClick={handleNextMonth}>▶</button>
        </div>
    );

    const renderDays = () => {
        const days = ['일', '월', '화', '수', '목', '금', '토'];
        return days.map(day => <div key={day} className="day">{day}</div>);
    };

    const handleCalendarClick = (day) => {
        const inputDate = new Date(day);
        const today = new Date();

        if (inputDate.setHours(0, 0, 0, 0) > today.setHours(0, 0, 0, 0)) {
            return;
        }

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
            const imageSrc = imageDates[formattedDate];

            dateCells.push(
                <div
                    key={formattedDate}
                    className={`date-cell ${isInCurrentMonth ? '' : 'disabled'}`}
                    onClick={() => handleCalendarClick(formattedDate)}
                >
                    <span className={`date-number ${isToday ? 'highlighted' : ''}`}>{format(day, 'd')}</span>
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
        <div className="container">
            {renderHeader()}
            <div className="calendar-grid">
                {renderDays()}
                {renderDates()}
            </div>
        </div>
    );
};

export default Calendar;