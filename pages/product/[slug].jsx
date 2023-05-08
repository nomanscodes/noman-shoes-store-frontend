import React, { useState } from "react";
import Wrapper from "@/components/Wrapper";
import ProductDetailsCerosule from "@/components/ProductDetailsCerosule";
import { IoMdHeartEmpty } from "react-icons/io";
import RelativeProduct from "@/components/RelativeProduct";
import { featchDataFromApi } from "@/utils/api";
import { getDiscountedPriceParcentage } from "@/utils/helper";
import ReactMarkdown from "react-markdown";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "@/store/cartSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductDetails = ({ product, relatedProducts }) => {
  const productData = product?.data?.[0]?.attributes;
  const [selectedSize, setSelectedSize] = useState();
  const [showError, setShowError] = useState(false);
  const dispatch = useDispatch();

  const notify = () => {
    toast.success("Sucess. Check your cart", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  return (
    <div className="w-full md:py-20">
      <ToastContainer />
      <Wrapper>
        <div className="flex flex-col lg:flex-row md:px-10 gap-[50px] lg:gap-[100px]">
          <div className="w-full md:w-auto flex-[1.5] max-w-[500px] lg:max-w-full mx-auto lg:mx-0">
            <ProductDetailsCerosule images={productData?.image?.data} />
          </div>

          <div className="flex-[1] py-3">
            {/* heading start */}
            <div className="text-[34px] font-semibold mb-2 leading-tight">
              {productData?.name}
            </div>
            <div className="text-lg font-semibold mb-5">
              {productData?.subtitle}
            </div>
            {/* price section  */}
            <div className=" flex items-center text-black/[0.9]">
              <p className="mr-2 text-lg font-semibold">
                &#2547;{productData?.price}
              </p>
              {productData?.original_price && (
                <>
                  <p className="text-base font-medium line-through">
                    &#2547;{productData?.original_price}
                  </p>
                  <p className="ml-auto text-base font-medium text-green-500">
                    {getDiscountedPriceParcentage(
                      productData?.original_price,
                      productData?.price
                    )}
                    % off
                  </p>
                </>
              )}
            </div>
            {/* price section end */}
            <div className="text-base font-medium text-black/[0.9]">
              incl. of taxes
            </div>
            <div className="text-base font-medium text-black/[0.9] mb-20">{`(Also includes all applicable duties)`}</div>
            {/* heading end */}
            {/* product range start */}
            <div className="mb-10">
              {/* heading start */}
              <div className="flex justify-between mb-2">
                <div className="text-base font-semibold">Select Size</div>
                <div className="text-base font-medium text-black/[0.8] cursor-pointer">
                  Select Guide
                </div>
              </div>
              {/* heading end */}
              {/* size start */}
              <div id="sizeSection" className="grid grid-cols-3 gap-2">
                {productData?.size?.data?.map((size, i) => (
                  <div
                    key={i}
                    className={`border rounded-md text-center py-3 font-medium ${
                      size?.enabled
                        ? "hover:border-black cursor-pointer"
                        : "cursor-not-allowed pointer-events-none bg-black/[0.5] opacity-50"
                    } ${selectedSize === size?.size ? "border-black" : ""}`}
                    onClick={() => {
                      setSelectedSize(size?.size);
                      setShowError(false);
                    }}
                  >
                    {size?.size}
                  </div>
                ))}
              </div>
              {/* size end */}
              {/* error start */}
              {showError && (
                <div className="text-red-500 mt-1">
                  Size selection is required
                </div>
              )}
              {/* error end */}
            </div>
            {/* product range end */}
            {/* add to cart button start */}
            <button
              className="w-full py-4 rounded-full bg-black text-white text-lg font-medium transition-transform active:scale-95 mb-3 hover:opacity-75"
              onClick={() => {
                // setShowError(!selectedSize ? true : false);
                if (!selectedSize) {
                  setShowError(true);
                  document.getElementById("sizeSection").scrollIntoView({
                    block: "center",
                    behavior: "smooth",
                  });
                } else {
                  dispatch(
                    addToCart({
                      ...product?.data?.[0],
                      selectedSize,
                      oneQuantityPrice: productData?.price,
                    })
                  );
                  notify();
                }
              }}
            >
              Add to Cart
            </button>
            {/* add to cart button end */}
            {/* whish list button start */}
            <button className="w-full py-4 rounded-full border border-black text-lg font-medium transition-transform active:scale-95 hover:opacity-95 flex items-center justify-center gap-2 mb-10">
              Whislist
              <IoMdHeartEmpty size={20} />
            </button>
            {/* whish list button end */}
            {/* product details start */}
            <div className="">
              <div className="text-lg font-bold mb-5">Product Details</div>

              <div className="markdown text-base mb-5">
                <ReactMarkdown>{productData?.description}</ReactMarkdown>
              </div>
            </div>
            {/* product details end */}
          </div>
        </div>
        <RelativeProduct relatedProducts={relatedProducts} />
      </Wrapper>
    </div>
  );
};

export default ProductDetails;

export async function getStaticPaths() {
  const products = await featchDataFromApi("/api/products?populate=*");

  const paths = products.data.map((p) => ({
    params: {
      slug: p.attributes.slug,
    },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params: { slug } }) {
  const product = await featchDataFromApi(
    `/api/products?populate=*&filters[slug][$eq]=${slug}`
  );
  const relatedProducts = await featchDataFromApi(
    `/api/products?populate=*&[filters][slug][$ne]=${slug}`
  );

  return {
    props: { product, relatedProducts, slug },
  };
}
