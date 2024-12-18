// 스프링 서버 베이스 주소
export const SPRING_BASE_URL = import.meta.env.VITE_SPRING_BASE_URL;

// children 컨트롤러 주소
export const SPRING_CHILDREN_BASE = SPRING_BASE_URL + '/api/children';
export const CHILDREN_LIST_BY_USER = SPRING_CHILDREN_BASE + '/all/';
export const CHILDREN_GET_CHILD = SPRING_CHILDREN_BASE + '/child/';
export const CHILDREN_CREATE = SPRING_CHILDREN_BASE + '/create';
export const CHILDREN_DELETE = SPRING_CHILDREN_BASE + '/';

// record 컨트롤러 주소
export const SPRING_RECORD_BASE = SPRING_BASE_URL + '/api/records';
export const RECORD_CHILD_ALL_RECORD = SPRING_RECORD_BASE + '/all/';
export const RECORD_CHILD_ALL_RECORD_CNT = SPRING_RECORD_BASE + '/cnt/';
export const RECORD_CHILD_ALL_BODY_SIZE = RECORD_CHILD_ALL_RECORD + 'body/';
export const RECORD_CHILD_ALL_PHOTO = RECORD_CHILD_ALL_RECORD + 'photo';
export const RECORD_CREATE = SPRING_RECORD_BASE + '/create';
export const RECORD_DETAIL = SPRING_RECORD_BASE + '/child/';
export const RECORD_CHILD_DATE_RECORD = SPRING_RECORD_BASE + '/child/{childId}/date/';
export const RECORD_RANDOM_PHOTO = SPRING_RECORD_BASE + '/randomPhoto/'
export const RECORD_CHILD_ALL_RECORD_WITH_QUERY = SPRING_RECORD_BASE + '/all/{childId}/{lastRecordId}/{size}/{query}';
export const RECORD_CHILD_MONTH_RECORDS = SPRING_RECORD_BASE + '/all/{childId}/{month}';
export const RECORD_PHOTO_WITH_QUERY = SPRING_RECORD_BASE + '/all/photo/{childId}/{lastMonth}/{size}/{query}';
export const RECORD_UPDATE = SPRING_RECORD_BASE + '/update';
export const RECORD_DELETE = SPRING_RECORD_BASE + '/delete/{recordId}';

//weekly-report 컨트롤러 주소
export const SPRING_REPORT_BASE =SPRING_BASE_URL + '/api/reports';
export const REPORT_CHILD_ALL_REPORT = SPRING_REPORT_BASE + '/all';
export const RECORD_CHILD_ALL_REPORT_CNT = SPRING_REPORT_BASE + '/cnt/';
export const REPORT_CHILD_REPORT = SPRING_REPORT_BASE + '/report';
export const REPORT_CREATE = SPRING_REPORT_BASE + '/create';
export const REPORT_DELETE = SPRING_REPORT_BASE + '/delete';
export const REPORT_UPDATE = SPRING_REPORT_BASE + '/update';

//AgeGenderStatistics 컨트롤러 주소
export const SPRING_STATISTIC_BASE =SPRING_BASE_URL + '/api/statistic';

// photo 컨트롤러 주소
export const SPRING_PHOTO_BASE = SPRING_BASE_URL + '/api/photos';
export const PHOTO_RECORD_PHOTO_LIST = SPRING_PHOTO_BASE + '/all/';

export const KAKAO_MAP = import.meta.env.VITE_KAKAO_MAP;
