import axios from "axios";
import {RECORD_CHILD_ALL_RECORD, RECORD_DETAIL} from "../../routes/ApiPath.js";

export const getDiaryDetail = (recordId) => {
    let {data} = axios.get(RECORD_DETAIL + recordId);
    return data;
}

export const getDiaries = (childId) => {
    let {data} = axios.get(RECORD_CHILD_ALL_RECORD + childId);
    return data;
}

export const getDiariesByMonth = (childId, month) => {
    let {data} = axios.get(RECORD_CHILD_ALL_RECORD + childId + '/' + month);
    return data;
}

export const getDiariesListInfinitely = async (childId, lastRecordId, size) => {
    const {data} = await axios.get(RECORD_CHILD_ALL_RECORD + childId + '/' + lastRecordId + '/' + size);
    console.log(data);
    return {data, nextLastRecordId: data[data.length-1]?.recordId, isLast: data.length < size};
}