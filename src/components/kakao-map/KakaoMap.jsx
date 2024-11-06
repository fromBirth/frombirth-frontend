import {Map, MapMarker} from "react-kakao-maps-sdk"
import UseKakaoMap from "./useKakaoMap"
import {useEffect, useState} from "react";
import useGeolocation from "react-hook-geolocation";

const KakaoMap = () => {
    const geolocation = useGeolocation();
    const [center, setCenter] = useState({lat: geolocation.latitude, lng: geolocation.longitude});
    const [position, setPosition] = useState({lat: 0, lng: 0});

    UseKakaoMap();
    useEffect(() => {
        setCenter({lat: geolocation.latitude, lng: geolocation.longitude});

        setPosition({lat: geolocation.latitude, lng: geolocation.longitude});
    },[]);

    return (
        // <div id="map-box" style={{width: "400px", height: "350px"}}>
            <Map // 지도를 표시할 Container
                id="map-display"
                center={center}
                style={{
                    // 지도의 크기
                    width: "100%",
                    height: "350px",
                    overflow: "hidden"
                }}
                level={3} // 지도의 확대 레벨
            >
                <MapMarker position={position} style={{ width: "10px", height: "10px", backgroundColor: "green" }} />
            </Map>
        // </div>
    )
}

export default KakaoMap;