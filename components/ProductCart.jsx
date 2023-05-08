import Link from "next/link";
import React from "react";
import Image from "next/image";
import { getDiscountedPriceParcentage } from "@/utils/helper";

const ProductCart = ({ data }) => {
  return (
    <Link
      href={`/product/${data?.attributes?.slug}`}
      className="transform overflow-hidden bg-white duration-200 hover:scale-105 cursor-pointer"
    >
      <Image
        width={500}
        height={500}
        src={data?.attributes?.thumbnail?.data?.[0]?.attributes?.url}
        alt={data?.attributes?.name}
      />
      <div className="p-4 text-black/[0.9]">
        <h1 className="text-lg font-medium">{data?.attributes?.name}</h1>
        <div className=" flex items-center text-black/[0.9]">
          <p className="mr-2 text-lg font-semibold">
            &#2547;{data?.attributes?.price}
          </p>
          {data?.attributes?.original_price && (
            <>
              <p className="text-base font-medium line-through">
                &#2547;{data?.attributes?.original_price}
              </p>
              <p className="ml-auto text-base font-medium text-green-500">
                {getDiscountedPriceParcentage(
                  data?.attributes?.original_price,
                  data?.attributes?.price
                )}
                % off
              </p>
            </>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCart;
