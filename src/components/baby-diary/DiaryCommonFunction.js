import axios from "axios";
import { RECORD_CHILD_ALL_RECORD, RECORD_DETAIL, RECORD_CHILD_DATE_RECORD } from "../../routes/ApiPath.js";

// 날짜를 기준으로 일기 데이터를 가져오는 함수
export const getDiaryByDate = async (childId, date) => {
    console.log(`일기 상세 요청 - childId: ${childId}, date: ${date}`); // 로그 추가

    try {
        // childId와 date를 RECORD_CHILD_DATE_RECORD에 동적으로 할당
        const requestUrl = RECORD_CHILD_DATE_RECORD.replace("{childId}", childId) + date;

        const { data } = await axios.get(requestUrl);
        console.log("일기 상세 데이터:", data); // 응답 데이터 로그
        return data;
    } catch (error) {
        console.error("일기 데이터를 가져오는 중 오류 발생:", error);
        return null;
    }
};

export const getDiaryDetail = (recordId) => {
    console.log("일기 상세 요청 - recordId:", recordId); // recordId 로그 추가
    let { data } = axios.get(RECORD_DETAIL + recordId);
    console.log("일기 상세 데이터:", data); // 응답 데이터 로그
    return data;
}

export const getDiaries = (childId) => {
    console.log("전체 일기 목록 요청 - childId:", childId); // childId 로그 추가
    let { data } = axios.get(RECORD_CHILD_ALL_RECORD + childId);
    console.log("전체 일기 목록:", data); // 응답 데이터 로그
    return data;
}

export const getDiaryPhotos = async (childId, lastMonth, size, query) => {
    let {data} = await axios.get(`${RECORD_CHILD_ALL_PHOTO}/${childId}/${lastMonth}/${size}/${query}`);
    console.log(data);
    return {data, nextLastMonth: data[data.length-1]?.lastMonth, isLast: data.length < size};
}

export const getDiariesByMonth = async (childId, month) => {
    const {data} = await axios.get(`${RECORD_CHILD_ALL_RECORD}${childId}/${month}`);
    console.log(data);
    return data;
}

export const getDiariesListInfinitely = async (childId, lastRecordId, size, query) => {
    const {data} = await axios.get(`${RECORD_CHILD_ALL_RECORD}${childId}/${lastRecordId}/${size}/${query}`);
    console.log(data);
    return {data, nextLastRecordId: data[data.length-1]?.recordId, isLast: data.length < size};
}
