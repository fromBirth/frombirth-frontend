import axios from "axios";
import {RECORD_CHILD_ALL_RECORD, RECORD_DETAIL} from "../../routes/ApiPath.js";

export const getDiaryDetail = (recordId) => {
    let {data} = axios.get(RECORD_DETAIL + recordId).data;
    return data;
}

export const getDiaries = (childId) => {
    let {data} = axios.get(RECORD_CHILD_ALL_RECORD + childId);
    return data;
}