import {Map, MapMarker} from "react-kakao-maps-sdk"
import useKakaoLoader from "./useKakaoLoader"
import {useEffect, useState} from "react";

export default function KakaoMap() {
    const [center, setCenter] = useState({lat: 0, lng: 0});
    const [position, setPosition] = useState({lat: 0, lng: 0});

    useKakaoLoader();
    useEffect(() => {
        navigator.geolocation.getCurrentPosition((pos) => {
            setCenter({lat:pos.coords.latitude, lng:pos.coords.longitude});
        });

        navigator.geolocation.watchPosition((pos) => {
            setPosition({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        });
    })

    return (
        <div id="map" style={{width: "400px", height: "300px"}}>
            <Map // 지도를 표시할 Container
                id="map"
                center={center}
                    style={{
                        // 지도의 크기
                        width: "100%",
                        height: "350px",
                    }}
                level={3} // 지도의 확대 레벨
            >
                <MapMarker position={position} style={{ width: "10px", height: "10px", backgroundColor: "green" }} />
            </Map>
        </div>
    )
}
