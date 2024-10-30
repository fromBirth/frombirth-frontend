// 스프링 서버 베이스 주소
export const SPRING_BASE_URL = import.meta.env.VITE_SPRING_BASE_URL;

// children 컨트롤러 주소
export const SPRING_CHILDREN_BASE = SPRING_BASE_URL + '/api/children';
export const CHILDREN_LIST_BY_USER = SPRING_CHILDREN_BASE + '/all/';
export const CHILDREN_GET_CHILD = SPRING_CHILDREN_BASE + '/child/';
export const CHILDREN_CREATE = SPRING_CHILDREN_BASE + '/create';
export const CHILDREN_DELETE = SPRING_CHILDREN_BASE + '/';