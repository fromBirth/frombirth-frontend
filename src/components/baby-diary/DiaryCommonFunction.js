import axios from "axios";
import {RECORD_CHILD_ALL_PHOTO, RECORD_CHILD_ALL_RECORD, RECORD_DETAIL} from "../../routes/ApiPath.js";

export const getDiaryDetail = (recordId) => {
    let {data} = axios.get(RECORD_DETAIL + recordId);
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