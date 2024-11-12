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

export const getDiariesByMonth = async (childId, month) => {
    console.log(`월별 일기 목록 요청 - childId: ${childId}, month: ${month}`); // childId와 month 로그 추가

    try {
        const { data } = await axios.get(RECORD_CHILD_ALL_RECORD + childId + '/' + month);
        console.log(`월별(${month}) 일기 목록:`, data); // 응답 데이터 로그
        return data;
    } catch (error) {
        console.error("데이터를 가져오는 중 오류가 발생했습니다:", error);
        return null; // 또는 오류 처리 로직에 맞는 반환값
    }
}

export const getDiariesListInfinitely = async (childId, lastRecordId, size) => {
    console.log(`무한 스크롤 요청 - childId: ${childId}, lastRecordId: ${lastRecordId}, size: ${size}`); // 모든 파라미터 로그 추가
    const { data } = await axios.get(RECORD_CHILD_ALL_RECORD + childId + '/' + lastRecordId + '/' + size);
    console.log("무한 스크롤 일기 목록:", data); // 응답 데이터 로그
    return { data, nextLastRecordId: data[data.length - 1]?.recordId, isLast: data.length < size };
}
