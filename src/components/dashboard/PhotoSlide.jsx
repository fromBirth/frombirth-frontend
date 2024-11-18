import axios from "axios";
import { useEffect, useState } from "react";
import Slider from "react-slick";
import { RECORD_RANDOM_PHOTO } from "../../routes/ApiPath.js";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './PhotoSlide.css'; // CSS 파일 추가

const PhotoSlide = ({ selectedChildId }) => {
    const [randomPhotoList, setRandomPhotoList] = useState([]);
    const settings = {
        dots: true,
        infinite: randomPhotoList.length > 1, // 사진이 2개 이상일 때만 무한 슬라이드 활성화
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        autoplay: true,
        autoplaySpeed: 4000,
    };

    const getRandomPhotos = async () => {
        try {
            const { data } = await axios.get(RECORD_RANDOM_PHOTO + selectedChildId);
            return data;
        } catch (error) {
            console.error("Error fetching random photos:", error);
            return [];
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            const data = await getRandomPhotos();
            setRandomPhotoList(data);
        };
        fetchData();
    }, [selectedChildId]);

    if (randomPhotoList.length === 0) {
        // 사진이 없을 경우 메시지 표시
        return (
            <div className="no-photos-message">
                <p>아직 등록된 사진이 없어요.</p>
            </div>
        );
    }

    return (
        <div className="photo-slider">
            <Slider {...settings}>
                {randomPhotoList.map((photo, index) => (
                    <div key={index}>
                        <img
                            src={photo.url}
                            alt={`Photo ${index + 1}`}
                            style={{
                                width: '100%',
                                height: '220px',
                                objectFit: 'cover',
                                borderRadius: '10px',
                            }}
                        />
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default PhotoSlide;
