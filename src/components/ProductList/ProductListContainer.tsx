import React from "react";
import { Link } from "react-router-dom";

interface ProductListContainerProps {
  children?: React.ReactNode;
}

function ProductListContainer({ children }: ProductListContainerProps) {
  return <div>{children}</div>;
}

function Title({ children }: any) {
  return <div className="pt-24 mb-24 ml-80 text-lg font-bold">{children}</div>;
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

interface ItemInfo {
  id: number;
  title: string;
  price: number;
  image: string;
}

interface ProductItemProps {
  children?: React.ReactNode;
  item: ItemInfo;
}

function ProductItem({ children, item }: ProductItemProps) {
  return (
    <Link
      className="flex xl:w-64 lg:w-48 h-96 flex-col items-center justify-center border border-b border-[lightgray] border-solid rounded-lg"
      to={`/product/${item.id}`}
      key={item.id}
    >
      <figure className="w-full h-96 flex items-center justify-center hover:scale-125 duration-500">
        <img
          src={item.image}
          alt=""
          style={{ maxWidth: "50%", maxHeight: "50%" }}
        />
      </figure>
      <div className="flex flex-col justify-between w-full h-64 leading-normal p-3 bg-[lightgray]">
        <p className="font-black">{item.title}</p>
        <p>${item.price}</p>
      </div>
    </Link>
  );
}

ProductListContainer.Title = Title;
ProductListContainer.ProductList = ProductList;
ProductListContainer.ProductItem = ProductItem;

export default ProductListContainer;
