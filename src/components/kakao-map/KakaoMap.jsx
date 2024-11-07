import { Map, MapMarker } from "react-kakao-maps-sdk";
import UseKakaoMap from "./useKakaoMap";
import { useEffect, useState } from "react";
import useGeolocation from "react-hook-geolocation";
import markerImage from '../../assets/img/marker_temp.svg'

const KakaoMap = () => {
    const geolocation = useGeolocation();
    const [center, setCenter] = useState({ lat: geolocation.latitude, lng: geolocation.longitude });
    const [position, setPosition] = useState({ lat: geolocation.latitude, lng: geolocation.longitude });
    const [markers, setMarkers] = useState([]);
    const [map, setMap] = useState(null);
    const [keyword, setKeyword] = useState('');

    UseKakaoMap();

    useEffect(() => {
        if (geolocation.latitude && geolocation.longitude) {
            setCenter({ lat: geolocation.latitude, lng: geolocation.longitude });
            setPosition({ lat: geolocation.latitude, lng: geolocation.longitude });
        }
    }, [geolocation]);

    useEffect(() => {
        if (geolocation.latitude !== 0 && geolocation.longitude !== 0 && window.kakao) {
            const geocoder = new window.kakao.maps.services.Geocoder();
            geocoder.coord2Address(geolocation.longitude, geolocation.latitude, (result, status) => {
                if (status === window.kakao.maps.services.Status.OK) {
                    const getAddressName = result[0].address;
                    setKeyword(`${getAddressName.region_2depth_name} ${getAddressName.region_3depth_name} 정신과`);
                }
            });
        }
    }, [geolocation]);

    useEffect(() => {
        if (!keyword || !map || !window.kakao) return;

        const ps = new window.kakao.maps.services.Places();
        ps.keywordSearch(keyword, (data, status) => {
            if (status === window.kakao.maps.services.Status.OK) {
                const bounds = new window.kakao.maps.LatLngBounds();
                const addMarkers = data.map((place, index) => {
                    bounds.extend(new window.kakao.maps.LatLng(place.y, place.x));
                    return {
                        position: { lat: place.y, lng: place.x },
                        content: place.place_name,
                        key: `marker-${index}-${place.place_name}`
                    };
                });

                setMarkers(addMarkers);
                map.setBounds(bounds);
            }
        },
            {
                location: new window.kakao.maps.LatLng(
                    geolocation.latitude,
                    geolocation.longitude
                ), // 중심 위치
                radius: 1000, // 반경 1km
                sort: "distance", // 거리순 정렬
                size: 5, // 최대 마커 개수
            });
    }, [map, keyword, geolocation]);

    return (
        <Map
            id="map-display"
            center={center}
            style={{
                width: "100%",
                height: "350px",
                overflow: "hidden"
            }}
            level={3}
            onCreate={setMap}
        >
            <MapMarker
                position={position}
                image={{
                    src: markerImage, // 마커이미지의 주소입니다
                    size: {
                        width: 50,
                        height: 50,
                    }, // 마커이미지의 크기입니다
                    options: {
                        offset: {
                            x: 23,
                            y: 50,
                        }, // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
                    },
                }}
            />
            {markers.map((marker) => (
                <MapMarker
                    key={marker.key}
                    position={marker.position}
                />
            ))}
        </Map>
    );
}

export default KakaoMap;
