import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import { cartAtom } from "../../atoms";
import { CartItemInfo } from "product";

interface ProductDetailContainerProps {
  children?: React.ReactNode;
}

const STAR_NUM = 5;
const starArr = new Array(STAR_NUM).fill(0);

function ProductDetailContainer({ children }: ProductDetailContainerProps) {
  return <div>{children}</div>;
}

function ProductContainer({ children }: any) {
  return <section className="pt-24 pb-80">{children}</section>;
}

function ProductTitle({ children }: any) {
  return <h2 className="text-lg font-bold pl-24 pt-12">{children}</h2>;
}

function ProductInfo({ children, data, star }: any) {
  const [cart, setCart] = useRecoilState(cartAtom);

  const onButtonClicked = (e: React.MouseEvent<HTMLButtonElement>) => {
    // const target = e.target as HTMLButtonElement;
    let found = false;
    for (let i = 0; i < cart.length; i++) {
      let ele = cart[i];
      if (ele.id === data.id) {
        found = true;

        let sum = ele.quantity + 1;
        let filtered = cart.filter((ele) => ele.id !== data.id);
        setCart(
          [...filtered, { ...ele, quantity: sum }]
            .sort((a, b) => {
              let c: any = new Date(a.date);
              let d: any = new Date(b.date);
              return c - d;
            })
            .sort((a, b) => {
              return a.id - b.id;
            })
        );
        break;
      }
    }

    if (!found) {
      const obj: CartItemInfo = {
        id: data.id,
        title: data.title,
        price: data.price,
        quantity: 1,
        date: new Date().toLocaleDateString("ko"),
        image: data.image,
      };
      // setCart([...cart, obj])
      setCart(
        [...cart, obj]
          .sort((a, b) => {
            let c: any = new Date(a.date);
            let d: any = new Date(b.date);
            return c - d;
          })
          .sort((a, b) => {
            return a.id - b.id;
          })
      );
    }
    console.log(cart);
  };

  return (
    <section className="flex items-center w-full h-80 gap-36 pl-24 mt-24">
      <img
        style={{ maxWidth: "100%", maxHeight: "100%" }}
        src={data.image}
        alt=""
      />
      <div className="w-2/4 flex flex-col gap-5">
        <p className="text-lg font-bold">{data.title}</p>
        <p className="leading-normal">{data.description}</p>

        <div className="flex items-center">
          {starArr.map((el, idx) => {
            return (
              <FaStar
                key={idx}
                size="20"
                className={star[idx] && "text-yellow-500"}
              />
            );
          })}
          <span className="ml-4">
            {data.rating.rate} / {data.rating.count}명 참여
          </span>
        </div>

        <p className="text-4xl font-bold">${data.price}</p>
        <div className="flex gap-5">
          <button
            className="text-sm bg-blue-700 hover:bg-blue-900 text-white p-3 rounded"
            onClick={onButtonClicked}
          >
            장바구니에 담기
          </button>
          <Link
            to="/cart"
            className="text-sm p-3 rounded border border-black hover:bg-black hover:text-white"
          >
            장바구니로 이동
          </Link>
        </div>
      </div>
    </section>
  );
}

ProductDetailContainer.ProductContainer = ProductContainer;
ProductDetailContainer.ProductTitle = ProductTitle;
ProductDetailContainer.ProductInfo = ProductInfo;

export default ProductDetailContainer;
