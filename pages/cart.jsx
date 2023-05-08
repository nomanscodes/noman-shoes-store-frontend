import React, { useMemo, useState } from "react";
import Wrapper from "@/components/Wrapper";
import CartItem from "@/components/CartItem";
import Link from "next/link";
import { AiOutlineDoubleRight } from "react-icons/ai";
import { useSelector } from "react-redux";
import { loadStripe } from "@stripe/stripe-js";
import { makePaymentRequest } from "@/utils/api";
// import STRIPE_PUBLISHABALE_KEY from "../utils/usefullConsts";

const stripePromise = loadStripe(
  "pk_test_51N5SmPSGFoj9bxmgSGZyUIPCalfJeWaUkgpVA2ZyTdpheraH1DWTMKjO1GOWSQE94fjv7GvODbsv91iO5wQHl2gB005i9K8l0c"
);

const Cart = () => {
  const [loading, setLoading] = useState(false);
  const { cartItem } = useSelector((state) => state.cart);

  const subTotal = useMemo(() => {
    return cartItem.reduce((total, val) => total + val.attributes.price, 0);
  }, [cartItem]);

  const handlePayment = async () => {
    try {
      setLoading(true);
      const stripe = stripePromise;

      const res = await makePaymentRequest("/api/orders", {
        products: cartItem,
      });

      // await stripe.redirectToCheckout({
      //   sessionId: res.stripeSession.id,
      // });

      (await stripe).redirectToCheckout({
        sessionId: res.stripeSession.id,
      });
    } catch (error) {
      setLoading(false);
      console.log("error:-", error);
    }
  };

  return (
    <div className="w-full md:py-20">
      <Wrapper>
        {cartItem.length > 0 && (
          <>
            <div className="text-center max-w-[800px] mx-auto mt-8 md:mt-0 ">
              <div className="text-[28px] md:text-[36px] mb-5 font-semibold leading-tight">
                Shopping Cart
              </div>
            </div>
            {/* cart content start */}
            <div className="flex flex-col lg:flex-row gap-12 py-10">
              {/* cart item start */}
              <div className="flex-[2]">
                <div className="text-lg font-bold">Cart Items</div>
                {cartItem?.map((item) => (
                  <CartItem key={item?.id} item={item} />
                ))}
              </div>
              {/* cart item end */}
              {/* cart summary start  */}
              <div className="flex-[1]">
                <div className="text-lg font-bold">Summary</div>
                <div className="p-5 my-5 bg-slate-300 rounded-lg">
                  <div className="flex justify-between ">
                    <div className="uppercase text-base md:text-lg font-medium text-black">
                      Subtotal
                    </div>
                    <div className="text-base md:text-lg font-medium text-black">
                      &#2547;{subTotal}
                    </div>
                  </div>
                  <div className="text-sm md:text-base py-5 border-t mt-5">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Error, itaque similique? Hic, ullam perspiciatis. Eos
                    aspernatur eligendi sint. Rem voluptatum magni nam maxime
                    reprehenderit saepe molestiae nulla blanditiis et dicta?
                  </div>
                </div>
                <button
                  className="w-full py-4 rounded-full bg-black text-white text-lg font-medium transition-transform active:scale-95 mb-3 hover:opacity-75 flex items-center justify-center gap-4"
                  onClick={handlePayment}
                >
                  Checkout
                  {loading && (
                    <picture>
                      <img src="/assets/spinner.svg" alt="loder" />
                    </picture>
                  )}
                </button>
              </div>
              {/* cart summary end  */}
            </div>
            {/* cart content end */}
          </>
        )}
        {cartItem.length === 0 && (
          <div className="flex-[2] flex flex-col items-center pb-[50px] md:mt-14">
            <picture>
              <img
                className="w-[300px] md:w-[400px]"
                src="/assets/empty-cart.jpg"
                alt="empty"
              />
            </picture>
            <span className="text-xl font-bold">Your cart is empty</span>
            <span className="text-center mt-4 ">
              Looks like you have not added anythig in your cart
              <br />
              Go ahed and explore top categories
            </span>
            <Link
              href="/"
              className=" py-4 px-8 rounded-md bg-black text-white text-lg font-medium transition-transform active:scale-95 mb-3 hover:opacity-75 flex items-center  gap-2"
            >
              <button>Continue Shopping</button>
              <AiOutlineDoubleRight size={20} />
            </Link>
          </div>
        )}
      </Wrapper>
    </div>
  );
};

export default Cart;
