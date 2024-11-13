import axios from "axios";
import {useEffect, useState} from "react";
import Slider from "react-slick";
import {RECORD_RANDOM_PHOTO} from "../../routes/ApiPath.js";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';


const PhotoSlide = ({selectedChildId}) => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        autoplay: true,
        autoplaySpeed: 4000
    };
    const [randomPhotoList, setRandomPhotoList] = useState([]);

    const getRandomPhotos = async () => {
        let {data} = await axios.get(RECORD_RANDOM_PHOTO + selectedChildId);
        console.log(data);
        return data;
    }

    useEffect(() => {
        const fetchData = async () => {
            const data = await getRandomPhotos();
            setRandomPhotoList(data);
        }

        fetchData();
    }, [selectedChildId]);

    return (
        <div className="photo-slider">
            <Slider {...settings}>
                {randomPhotoList.map((photo, index) => (
                    <div key={index}>
                        <img src={photo.url} alt="" style={{width: '100%', height: '220px', objectFit: 'cover', borderRadius: '10px'}}/>
                    </div>
                ))}
            </Slider>
        </div>
    );
}

export default PhotoSlide;