import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import "./newCarouselStyle.css";
import { Carousel } from "react-responsive-carousel";
import { Link } from "react-router-dom";

function MainContainer({ children }: any) {
  return <main className="pt-12 w-full object-contain">{children}</main>;
}

function CarouselList({ children }: any) {
  return (
    <section className="w-auto ">
      <Carousel
        showThumbs={false}
        showStatus={false}
        infiniteLoop={true}
        autoPlay={true}
        interval={3000}
      >
        {children}
      </Carousel>
    </section>
  );
}
function CarouselItem({ children, to, title, desc, img }: any) {
  return (
    <div>
      <div className="absolute left-24 flex flex-col gap-5 right-auto bottom-2/3 mb-10 text-left w-64 rounded text-black font-bold">
        <h2 className="text-4xl">{title}</h2>
        <p>{desc}</p>
        <p>
          <Link to={to} className="bg-gray-500 p-3 rounded mt-24 text-white">
            바로가기
          </Link>
        </p>
      </div>
      <img src={img} style={{ objectFit: "contain" }} />
    </div>
  );
}

function ProductList({ children }: any) {
  return <section className="w-3/4 mx-auto ">{children}</section>;
}
function ListTitle({ children }: any) {
  return (
    <h2 className="flex justify-center text-3xl font-bold pt-24 mb-5 pr-5">
      {children}
    </h2>
  );
}
function ProductItem({ children, item }: any) {
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

MainContainer.CarouselList = CarouselList;
MainContainer.CarouselItem = CarouselItem;
MainContainer.ProductList = ProductList;
MainContainer.ListTitle = ListTitle;
MainContainer.ProductItem = ProductItem;

export default MainContainer;
