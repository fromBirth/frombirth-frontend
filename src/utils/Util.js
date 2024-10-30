import {checkLeapYear} from "./Validator.js";

export const getLastDateByMonth = (month, year) => {
    const daysInMonth = [31, checkLeapYear(year) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    return daysInMonth[month-1];
}

export const numberAddZero = (value, length) => {
    return String(value).padStart(length, "0");
}