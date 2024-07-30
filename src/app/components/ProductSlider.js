import { useRef } from "react";
import Slider from "react-slick";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";

export function ProductSlider({ gallery = [] }) {
  console.log(gallery);
  const sliderRef = useRef();

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const goToNext = () => {
    sliderRef.current.slickNext();
  };

  const goToPrev = () => {
    sliderRef.current.slickPrev();
  };

  if (!gallery || gallery.length === 0) {
    return <div>No images available</div>;
  }

  if (gallery.length === 1) {
    return (
      <div className="relative">
        <img
          src={`${process.env.NEXT_PUBLIC_IMG_URL}/${gallery[0]}`}
          className="h-auto w-full max-w-full rounded-lg object-cover object-center md:h-[500px]"
          alt="gallery-image"
        />
      </div>
    );
  }

  return (
    <div className="relative">
      <Slider ref={sliderRef} {...settings}>
        {gallery.map((item, index) => (
          <div key={index}>
            <img
              src={`${process.env.NEXT_PUBLIC_IMG_URL}/${item}`}
              className="h-auto w-full max-w-full rounded-lg object-cover object-center md:h-[500px]"
              alt={`Car ${index}`}
            />
          </div>
        ))}
      </Slider>
      <button
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white p-2 rounded-full"
        onClick={goToPrev}
      >
        <FaChevronLeft className="h-6 w-6" />
      </button>
      <button
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white p-2 rounded-full"
        onClick={goToNext}
      >
        <FaChevronRight className="h-6 w-6" />
      </button>
    </div>
  );
}
