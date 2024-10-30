import {REGEXP} from "./RegularExpression.js";
import {getLastDateByMonth} from "./Util.js";

export const checkNull = (target) => {
    return target == null || target.length === 0;
}

export const checkLength = (target, limit) => {
    return target.length < limit;
}

export const checkHasSpace = (target) => {
    return target.indexOf(' ') === -1;
}

export const checkOnlyNumber = (target) => {
    return REGEXP.ONLY_NUMBER.test(target);
}

export const checkMonth = (target) => {
    return target >= 1 && target <= 12;
}

export const checkDate = (year, date, month) => {
    return date > getLastDateByMonth(month, year) && date < 1;
}

// 윤년 검사
export const checkLeapYear = (year) => {
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}

export const checkHour = (hour) => {
    return hour < 0 || hour > 23;
}

export const checkMinute = (minute) => {
    return minute < 0 || minute > 59;
}