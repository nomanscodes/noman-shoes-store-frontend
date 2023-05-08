import React from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import Image from "next/image";
import { updateCart, removeFromCart } from "@/store/cartSlice";
import { useDispatch } from "react-redux";

const CartItem = ({ item }) => {
  const singleItem = item?.attributes;

  const dispatch = useDispatch();

  const updateCartItem = (e, key) => {
    let payload = {
      key,
      val: key === "quantity" ? parseInt(e?.target?.value) : e?.target?.value,
      id: item?.id,
    };
    dispatch(updateCart(payload));
  };


  return (
    <div className="flex py-5 gap-3 md:gap-5 border-b">
      {/* image */}
      <div className="shrink-0 aspect-square w-[50px] md:w-[100px]">
        <Image
          alt={singleItem?.name}
          src={singleItem?.thumbnail?.data?.[0]?.attributes.url}
          height={120}
          width={120}
        />
      </div>
      {/* detail */}
      <div className="w-full flex flex-col">
        <div className="flex flex-col md:flex-row justify-between ">
          {/* product title */}
          <div className="text-lg md:text-2xl font-semibold text-black/[0.8]">
            {singleItem?.name}
          </div>
          {/* product subtitle */}
          <div className="text-sm md:text-base font-medium text-black/[0.8] block md:hidden">
            {singleItem?.subtitle}
          </div>
          {/* product price */}
          <div className="text-sm md:text-base font-medium text-black/[0.8] mt-2">
            &#2547;{singleItem?.price}
          </div>
        </div>
        {/* product subtitle */}
        <div className="text-sm md:text-base font-medium text-black/[0.8] hidden md:block">
          {singleItem?.subtitle}
        </div>
        {/* size selector  */}
        <div className="flex items-center justify-between mt-4 ">
          <div className=" flex items-center gap-2 md:gap-10 text-black/[0.5] text-sm md:text-base">
            {/* size  */}
            <div className="flex items-center gap-1">
              <div className="font-semibold">Size:</div>
              <select
                className="bg-black text-white px-2 cursor-pointer"
                onChange={(e) => updateCartItem(e, "selectedSize")}
              >
                {singleItem?.size?.data?.map((sizeData, i) => (
                  <option
                    key={i}
                    value={sizeData?.size}
                    disabled={sizeData?.enabled ? false : true}
                    selected={item?.selectedSize == sizeData?.size}
                  >
                    {sizeData?.size}
                  </option>
                ))}
              </select>
            </div>
            {/* quantity  */}
            <div className="flex items-center gap-1">
              <div className="font-semibold">Quantity:</div>
              <select
                className="bg-black text-white px-2 cursor-pointer"
                onChange={(e) => updateCartItem(e, "quantity")}
              >
                {Array.from({ length: 10 }, (_, i) => i + 1).map((q, i) => {
                  return (
                    <option key={i} value={q} selected={item?.quantity == q}>
                      {q}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <RiDeleteBin6Line
            className="cursor-pointer text-black text-base md:text-lg"
            onClick={() => dispatch(removeFromCart({ id: item.id }))}
          />
        </div>
      </div>
    </div>
  );
};
export default CartItem;
