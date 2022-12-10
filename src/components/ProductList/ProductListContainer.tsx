import React, { useState } from "react";
import { Link } from "react-router-dom";
import Pagination from "react-js-pagination";
import "./Paging.css";
import { ItemInfo } from "product";
import { LazyLoadImage } from "react-lazy-load-image-component";

interface ProductListContainerProps {
  children?: React.ReactNode;
}

function ProductListContainer({ children }: ProductListContainerProps) {
  return <div className="pb-80 dark:bg-gray-500">{children}</div>;
}

function Title({ children }: any) {
  return (
    <div className="pt-24 mb-24 ml-80 text-lg font-bold dark:text-white">
      {children}
    </div>
  );
}

function ProductList({ children }: any) {
  return (
    <section className="w-3/4 mx-auto">
      <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-12 w-full">
        {children}
      </div>
    </section>
  );
}

interface ProductItemProps {
  children?: React.ReactNode;
  item: ItemInfo;
}

function ProductItem({ children, item }: ProductItemProps) {
  return (
    <Link
      className="flex xl:w-64 lg:w-48 h-96 flex-col items-center justify-center border border-b border-[lightgray] border-solid rounded-lg dark:border-gray-700"
      to={`/product/${item.id}`}
    >
      <figure className="w-full h-96 flex items-center justify-center dark:bg-white ">
        <LazyLoadImage
          className="hover:scale-125 duration-500"
          width=""
          height=""
          src={item.image}
          alt="사진"
          style={{ maxWidth: "50%", maxHeight: "50%" }}
        />
      </figure>
      <div className="flex flex-col justify-between w-full h-64 leading-normal p-3 bg-[lightgray] dark:bg-gray-700 dark:text-white">
        <p className="font-black">{item.title}</p>
        <p>${item.price}</p>
      </div>
    </Link>
  );
}

function Paging({ children, page, count, setPage, limit }: any) {
  return (
    <Pagination
      activePage={page}
      itemsCountPerPage={limit}
      totalItemsCount={count}
      pageRangeDisplayed={5}
      prevPageText={"<"}
      nextPageText={">"}
      onChange={setPage}
    />
  );
}

ProductListContainer.Title = Title;
ProductListContainer.ProductList = ProductList;
ProductListContainer.ProductItem = ProductItem;
ProductListContainer.Paging = Paging;

export default ProductListContainer;
