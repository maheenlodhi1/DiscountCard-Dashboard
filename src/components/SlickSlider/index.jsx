import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function SlickSlider({ visibleSlides = 5, children }) {
  return (
    <Slider
      centerMode={true}
      accessibility={true}
      slidesToShow={visibleSlides}
      slidesToScroll={1}
      swipeToSlide
      draggable
      adaptiveHeight
      lazyLoad
      responsive={[
        { breakpoint: 1024, settings: { slidesToShow: 4 } },
        { breakpoint: 640, settings: { slidesToShow: 3 } },
      ]}
    >
      {children}
    </Slider>
  );
}
