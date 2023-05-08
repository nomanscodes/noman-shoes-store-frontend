import React, { useEffect, useState } from "react";
import Wrapper from "@/components/Wrapper";
import ProductCart from "@/components/ProductCart";
import { featchDataFromApi } from "@/utils/api";
import useSWR from "swr";
import { useRouter } from "next/router";

const maxResult = 3;

const Category = ({ category, product, slug }) => {
  const productData = product?.data;
  const [pageIndex, setPageIndex] = useState(1);

  const { query } = useRouter();

  useEffect(() => {
    setPageIndex(1);
  }, [query]);

  const { data, error, isLoading } = useSWR(
    `/api/products?populate=*&[filters][cetagories][slug][$eq]=${slug}&pagination[page]=${pageIndex}&pagination[pageSize]=${maxResult}`,
    featchDataFromApi,
    {
      fallbackData: productData,
    }
  );

  const paginationData = data?.data;
  // console.log("paginationData", data?.meta.pagination);

  return (
    <div className="w-full md:py-20 relative">
      <Wrapper>
        <div className="text-center mx-w-[800px] mx-auto my-[50px] md:my-[80px] ">
          <div className="text-xl md:text-3xl mb-4 font-semibold leading-tight">
            {category?.data?.[0]?.attributes?.name}
          </div>
        </div>
        <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-14 px-5 md:px-0">
          {paginationData?.map((product) => (
            <ProductCart key={product?.id} data={product} />
          ))}
        </div>

        {data?.meta?.pagination?.total > maxResult && (
          <div className="flex gap-3 items-center justify-center my-16 md:my-0">
            <button
              className={`rounded py-2 px-4 bg-black text-white disabled:bg-gray-200 disabled:text-gray-500`}
              disabled={pageIndex === 1}
              onClick={() => setPageIndex(pageIndex - 1)}
            >
              Previous
            </button>

            <span className="font-bold">{`${pageIndex} of ${
              data && data.meta.pagination.pageCount
            }`}</span>

            <button
              className={`rounded py-2 px-4 bg-black text-white disabled:bg-gray-200 disabled:text-gray-500`}
              disabled={pageIndex === (data && data.meta.pagination.pageCount)}
              onClick={() => setPageIndex(pageIndex + 1)}
            >
              Next
            </button>
          </div>
        )}
        {isLoading && (
          <div className="absolute top-0 left-0 w-full h-full bg-white/[0.5] flex flex-col gap-5 justify-center items-center">
            <picture>
              <img alt="hhh" src="/assets/logo.svg" width={150} />
            </picture>
            <span className="text-2xl font-medium">Loading...</span>
          </div>
        )}
      </Wrapper>
    </div>
  );
};

export default Category;

export async function getStaticPaths() {
  const category = await featchDataFromApi("/api/cetagories?populate=*");

  const paths = category.data.map((c) => ({
    params: {
      slug: c.attributes.slug,
    },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params: { slug } }) {
  const category = await featchDataFromApi(
    `/api/cetagories?filters[slug][$eq]=${slug}`
  );
  const product = await featchDataFromApi(
    `/api/products?populate=*&[filters][cetagories][slug][$eq]=${slug}&pagination[page]=1&pagination[pageSize]=${maxResult}`
  );

  return {
    props: { category, product, slug },
  };
}
