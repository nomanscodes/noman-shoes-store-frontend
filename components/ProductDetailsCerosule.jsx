import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

const ProductDetailsCerosule = ({ images }) => {

  return (
    <div className="text-white text-[20px] w-full max-w-[1360px] mx-auto sticky top-12">
      <Carousel
        infiniteLoop={true}
        showArrows={false}
        showStatus={false}
        thumbWidth={60}
        className="productCarousel"
      >
        {images?.map((img) => (
          <picture key={img.id}>
            <img src={img?.attributes?.url} alt={img?.attributes?.name} />
          </picture>
        ))}
      </Carousel>
    </div>
  );
};

export default ProductDetailsCerosule;
