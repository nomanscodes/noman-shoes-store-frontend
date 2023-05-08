import HeadingAndPragaph from "@/components/HeadingAndPragaph";
import HeroSlider from "@/components/HeroSlider";
import ProductCart from "@/components/ProductCart";
import Wrapper from "@/components/Wrapper";
import { featchDataFromApi } from "@/utils/api";
import { useEffect, useState } from "react";

export default function Home({ data }) {

  return (
    <>
      <HeroSlider />
      <Wrapper>
        <HeadingAndPragaph />
        <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-14 px-5 md:px-0">
          {data?.map((product) => (
            <ProductCart key={product?.id} data={product} />
          ))}
        </div>
      </Wrapper>
    </>
  );
}

export async function getStaticProps() {
  const { data } = await featchDataFromApi("/api/products?populate=*");
  return {
    props: {
      data,
    },
  };
}
