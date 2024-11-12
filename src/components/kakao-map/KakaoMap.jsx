import { Map, MapMarker, CustomOverlayMap } from "react-kakao-maps-sdk";
import UseKakaoMap from "./useKakaoMap";
import { useEffect, useState } from "react";
import useGeolocation from "react-hook-geolocation";
import markerImage from '../../assets/img/marker_temp.svg'
import styled from "styled-components";

const KakaoMap = () => {
    const geolocation = useGeolocation();

    const [center, setCenter] = useState({ lat: geolocation.latitude, lng: geolocation.longitude });
    const [position, setPosition] = useState({ lat: geolocation.latitude, lng: geolocation.longitude });
    const [markers, setMarkers] = useState([]);
    const [map, setMap] = useState(null);
    const [keyword, setKeyword] = useState('');
    const [selectedMarker, setSelectedMarker] = useState(null);

    UseKakaoMap();

    // Android WebView 여부 확인
    useEffect(() => {
        if (window.AndroidLocation && typeof window.AndroidLocation.isAndroidWebView === "function") {
            // Android WebView에서 현재 위치 요청
            window.AndroidLocation.sendCurrentLocation();
            console.log("안드로이드 실행")
        } else {
            // 브라우저에서 Geolocation API를 사용하여 위치 요청
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition((position) => {
                    setCenter({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    });
                    setPosition({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    });
                });
            }
            console.log("geolocation 실행")
        }
    }, []);

    // Android에서 위치 정보를 받을 JavaScript 함수 정의
    useEffect(() => {
        window.setLocation = (latitude, longitude) => {
            console.log(`위치정보 받아옴 ${latitude} ${longitude}`)
            setCenter({ lat: latitude, lng: longitude });
            setPosition({ lat: latitude, lng: longitude });
        };
    }, []);

    // 현재 위치를 바탕으로 주소를 검색
    useEffect(() => {
        if (position.lat && position.lng) {
            setCenter({ lat: position.lat, lng: position.lng });
        }
    }, [position]);

    // 위치 기반으로 '소아정신과' 키워드로 검색
    useEffect(() => {
        if (position.lat !== 0 && position.lng !== 0 && window.kakao) {
            const geocoder = new window.kakao.maps.services.Geocoder();
            geocoder.coord2Address(position.lng, position.lat, (result, status) => {
                if (status === window.kakao.maps.services.Status.OK) {
                    const getAddressName = result[0].address;
                    setKeyword(`${getAddressName.region_2depth_name} ${getAddressName.region_3depth_name} 정신과`);
                }
            });
        }
    }, [position]);

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
        }, {
            location: new window.kakao.maps.LatLng(position.lat, position.lng),
            radius: 3000,
            sort: "distance",
            size: 5,
        });
    }, [map, keyword, position]);

    const handleMarkerClick = (content) => {
        if(content === selectedMarker) setSelectedMarker("");
        else setSelectedMarker(content);
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
                    src: markerImage,
                    size: { width: 50, height: 50 },
                    options: { offset: { x: 23, y: 50 } },
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
};

export default KakaoMap;

const MarkerInfo = styled.div`
    position: relative;
    outline: none;
    background-color: #FFFFFF;
    border: 3px solid #FF893C;
    padding: 10px;
    border-radius: 8px;
    font-size: 14px;
    color: #333;

    &::after {
        content: "";
        position: absolute;
        bottom: -10px;
        left: 50%;
        transform: translateX(-50%);
        width: 0;
        height: 0;
        border-left: 10px solid transparent;
        border-right: 10px solid transparent;
        border-top: 10px solid #FF893C;
    }
`;
