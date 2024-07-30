// components/CarGallery.js
import React from "react";
import Image from "next/image";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const CarGallery = ({ images = [] }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="car-gallery">
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index}>
            <Image
              src={`${process.env.NEXT_PUBLIC_IMG_URL}/${image}`}
              alt={`Car image ${index}`}
              layout="responsive"
              width={800}
              height={600}
              className="object-cover"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default CarGallery;
