import { useKakaoLoader } from "react-kakao-maps-sdk";
import { KAKAO_MAP } from "../../routes/ApiPath.js";

export default function UseKakaoMap() {

    return useKakaoLoader({
        appkey: KAKAO_MAP,
        libraries: ["services"]
    });
}