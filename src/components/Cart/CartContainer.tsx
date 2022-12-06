import React from "react";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import { cartAtom } from "../../atoms";

function CartContainer({ children }: any) {
  return <div className="dark:bg-gray-500 dark:text-white">{children}</div>;
}

function CartList({ children }: any) {
  return (
    <section className="pt-24">
      <section className="flex w-3/4 gap-36 pl-24 mt-24">{children}</section>
    </section>
  );
}
function CartItem({ children, item }: any) {
  const [cart, setCart] = useRecoilState(cartAtom);

  const onButtonClicked = (
    e: React.MouseEvent<HTMLButtonElement>,
    cur: any
  ) => {
    const target = e.target as HTMLButtonElement;
    switch (target.innerText) {
      case "+":
        for (let i = 0; i < cart.length; i++) {
          let ele = cart[i];
          if (ele.id === cur.id) {
            let sum = ele.quantity + 1;

            let filtered = cart.filter((ele) => ele.id !== cur.id);
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

        console.log(cart);

        break;
      case "-":
        for (let i = 0; i < cart.length; i++) {
          let ele = cart[i];
          if (ele.id === cur.id) {
            let sum = ele.quantity - 1;
            if (sum >= 1) {
              let filtered = cart.filter((ele) => ele.id !== cur.id);
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
            }

            break;
          }
        }
        break;
      case "삭제":
        for (let i = 0; i < cart.length; i++) {
          let ele = cart[i];
          if (ele.id === cur.id) {
            let filtered = cart.filter((ele) => ele.id !== cur.id);
            setCart(filtered);
          }
        }
        break;
      default:
        break;
    }
  };

  return (
    <div className="flex items-center gap-24">
      <Link
        className="flex flex-col items-center justify-center"
        style={{ height: "fit-content" }}
        to={`/product/${item.id}`}
        key={item.id}
      >
        <figure className="w-56 h-80 flex items-center justify-center bg-white rounded-xl m-3">
          <img
            src={item.image}
            alt="상품"
            style={{ maxWidth: "80%", maxHeight: "80%" }}
          />
        </figure>
      </Link>
      <div className="flex flex-col gap-5">
        <div className="font-black leading-normal text-lg">
          <p>{item.title}</p>
          <p className="text-2xl font-bold">${item.price}</p>
        </div>
        <div className="flex gap-5">
          <button
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
              onButtonClicked(e, item);
            }}
            className="bg-blue-700 p-3 text-white rounded-l-md hover:bg-blue-900"
          >
            -
          </button>
          <button disabled className="font-bold">
            {item.quantity}
          </button>
          <button
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
              onButtonClicked(e, item);
            }}
            className="bg-blue-700 p-3 text-white rounded-r-md mr-12 hover:bg-blue-900"
          >
            +
          </button>
          <button
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
              onButtonClicked(e, item);
            }}
            className="border border-black hover:bg-black hover:text-white p-3"
          >
            삭제
          </button>
        </div>
      </div>
    </div>
  );
}
function CartTotal({ children }: any) {
  const [cart, setCart] = useRecoilState(cartAtom);
  const getTotalPrice = () => {
    return cart.reduce((acc, cur) => {
      return acc + cur.price * cur.quantity;
    }, 0);
  };

  return (
    <div className="h-full w-1/4 pt-24 text-2xl font-bold">
      {/* <p>total: {getTotalQuantity()} </p> */}
      <p>총 : ${getTotalPrice()} </p>
      <button
        className="mt-4 bg-blue-700 p-3 text-white rounded hover:bg-blue-900"
        onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
          setCart([]);
        }}
      >
        구매하기
      </button>
    </div>
  );
}

CartContainer.CartList = CartList;
CartContainer.CartItem = CartItem;
CartContainer.CartTotal = CartTotal;

export default CartContainer;
