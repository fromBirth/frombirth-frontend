import {checkLeapYear} from "./Validator.js";

export const getLastDateByMonth = (month, year) => {
    const daysInMonth = [31, checkLeapYear(year) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    return daysInMonth[month-1];
}

export const numberAddZero = (value, length) => {
    return String(value).padStart(length, "0");
}

export const getYearMonthDateByLocalDate = (localDate) => {
    const localDateParsed = localDate.split('-');
    return {year: localDateParsed[0], month: Number(localDateParsed[1]), date: Number(localDateParsed[2])};
}

export const getAmPmHourMinuteByLocalTime = (localTime) => {
    const localTimeParsed = localTime.split(':');
    const isAm = localTimeParsed[0] < 12 ? 'AM' : 'PM';
    const hour = isAm === 'AM' ? localTimeParsed[0] : localTimeParsed[0] - 12;
    const minute = localTimeParsed[1];

    return {isAm, hour, minute};

}

export function calculateAgeInMonthsAndDays(birthday) {
    const today = new Date();
    const birthDate = new Date(birthday);

    let months = (today.getFullYear() - birthDate.getFullYear()) * 12 + (today.getMonth() - birthDate.getMonth());
    let days = today.getDate() - birthDate.getDate();

    // Adjust if days are negative
    if (days < 0) {
        months -= 1;
        const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
        days += prevMonth.getDate();
    }

    return months + '개월 ' + days + '일 ' ;
}

export function calculateAge(birthday) {
    const today = new Date();
    const birthDate = new Date(birthday);

    let age = today.getFullYear() - birthDate.getFullYear();

    // 생일이 아직 지나지 않았으면 나이에서 1을 뺍니다.
    if (
        today.getMonth() < birthDate.getMonth() ||
        (today.getMonth() === birthDate.getMonth() && today.getDate() < birthDate.getDate())
    ) {
        age--;
    }

    return age;
}