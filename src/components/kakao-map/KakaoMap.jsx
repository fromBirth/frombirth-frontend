import { Map, MapMarker, CustomOverlayMap } from "react-kakao-maps-sdk";
import UseKakaoMap from "./useKakaoMap";
import { useEffect, useState } from "react";
import useGeolocation from "react-hook-geolocation";
import markerImage from '../../assets/img/marker_temp.svg'
import log from "eslint-plugin-react/lib/util/log.js";
import styled from "styled-components";

const KakaoMap = () => {
    const geolocation = useGeolocation();

    const [center, setCenter] = useState({ lat: geolocation.latitude, lng: geolocation.longitude });
    const [position, setPosition] = useState({ lat: geolocation.latitude, lng: geolocation.longitude });
    const [markers, setMarkers] = useState([]);
    const [map, setMap] = useState(null);
    const [keyword, setKeyword] = useState('');
    const [selectedMarker, setSelectedMarker] = useState(null); // 클릭된 마커 정보 상태

    UseKakaoMap();

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((pos) => log(pos));
    }, []);

    // 현재 위치를 바탕으로 주소를 검색
    useEffect(() => {
        if (geolocation.latitude && geolocation.longitude) {
            setCenter({ lat: geolocation.latitude, lng: geolocation.longitude });
            setPosition({ lat: geolocation.latitude, lng: geolocation.longitude });
        }
    }, [geolocation]);

    // 위치 기반으로 '소아정신과' 키워드로 검색
    useEffect(() => {
        if (geolocation.latitude !== 0 && geolocation.longitude !== 0 && window.kakao) {
            const geocoder = new window.kakao.maps.services.Geocoder();
            geocoder.coord2Address(geolocation.longitude, geolocation.latitude, (result, status) => {
                if (status === window.kakao.maps.services.Status.OK) {
                    const getAddressName = result[0].address;
                    setKeyword(`${getAddressName.region_2depth_name} ${getAddressName.region_3depth_name} 정신과`);
                    // xx구 xx동 + 키워드
                }
            });
        }
    }, [geolocation]);

    // 키워드에 해당하는 장소 검색
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
                radius: 3000, // 반경 3km
                sort: "distance", // 거리순 정렬
                size: 5, // 최대 마커 개수
            });
    }, [map, keyword, geolocation]);

    const handleMarkerClick = (content) => {
        if(content === selectedMarker) setSelectedMarker("");
        else setSelectedMarker(content); // 클릭된 마커의 정보를 저장
    };

    return (
        <Map
            id="map-display"
            center={center}
            style={{
                width: "100%",
                height: "350px",
                overflow: "hidden"
            }}
            level={5}
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
                    onClick={() => handleMarkerClick(marker.content)}
                >
                    {selectedMarker === marker.content && (
                        <CustomOverlayMap
                            position={marker.position}
                            xAnchor={0.5}
                            yAnchor={2}
                            zIndex={999}
                        >
                            <MarkerInfo>{marker.content}</MarkerInfo>
                        </CustomOverlayMap>
                    )}
                </MapMarker>

            ))}

        </Map>
    );
}

export default KakaoMap;

const MarkerInfo = styled.div`
    position: relative;
    outline: none;
    background-color: #FFFFFF; /* 말풍선 배경색 */
    border: 3px solid #FF893C;
    padding: 10px;
    border-radius: 8px;
    font-size: 14px;
    color: #333;
    
    &::after {
    content: "";
    position: absolute;
    bottom: -10px; /* 화살표 위치 */
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-top: 10px solid #FF893C; /* 말풍선 배경색과 동일 */
    }
`;