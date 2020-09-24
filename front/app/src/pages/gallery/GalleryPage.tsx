import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Mousewheel } from 'swiper';
import 'swiper/swiper.scss';
import 'swiper/components/pagination/pagination.scss';
import '../../styles/galleryPage.scss';
SwiperCore.use([Mousewheel]);

const GalleryPage: React.FC = () => {
  const ref = useRef<HTMLInputElement>(null) as React.MutableRefObject<
    HTMLInputElement
  >;
  const [value, setValue] = useState(0);
  const [lastSlidesValue, setLastSlidesValue] = useState(0);

  const getLastSlideLeft = () => {
    const swiper__slides = document.getElementById('swiper__slides')
      ?.childNodes[0].childNodes;
    if (swiper__slides) {
      const length = swiper__slides?.length;
      const last__slides = swiper__slides[length - 1] as HTMLElement;
      return last__slides.getBoundingClientRect().left;
    }
    return 0;
  };

  useEffect(() => {
    setLastSlidesValue(getLastSlideLeft());
  }, []);

  return (
    <div className="gallery-page">
      <Swiper
        slidesPerView={1.5}
        centeredSlides
        freeMode
        onProgress={() => {
          setValue(getLastSlideLeft());
        }}
        speed={1000}
        spaceBetween={30}
        mousewheel={true}
        id="swiper__slides"
      >
        <SwiperSlide>
          <div className="gallery__slide" ref={ref}>
            <img src="https://1keiu-portfolio20.s3-ap-northeast-1.amazonaws.com/gallery/DSC_0117+2.jpeg"></img>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="gallery__slide">
            <img src="https://1keiu-portfolio20.s3-ap-northeast-1.amazonaws.com/gallery/DSC_0117+2.jpeg"></img>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="gallery__slide">
            <img src="https://1keiu-portfolio20.s3-ap-northeast-1.amazonaws.com/gallery/DSC_0117+2.jpeg"></img>
          </div>
        </SwiperSlide>
      </Swiper>
      <p className="text">{value}</p>
    </div>
  );
};

export default GalleryPage;
