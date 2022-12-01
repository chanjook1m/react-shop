import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import { useRecoilState } from "recoil";
import { cartAtom } from "../atoms";

type CartProps = {
  children?: React.ReactNode;
};

interface ProductInfo {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating?: object;
  quantity?: number;
}

interface Product {
  productId: number;
  quantity: number;
}

const API_URL = "https://fakestoreapi.com/products";

export default function Cart(props: CartProps) {
  const [data, setData] = useState<ProductInfo[]>([]);
  const [cart, setCart] = useRecoilState(cartAtom);

  const getTotalQuantity = () => {
    return cart.reduce((acc, cur) => {
      return acc + cur.quantity;
    }, 0);
  };

  const getTotalPrice = () => {
    return cart.reduce((acc, cur) => {
      return acc + cur.price * cur.quantity;
    }, 0);
  };

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

  useEffect(() => {
    // fetch("https://fakestoreapi.com/carts/user/1")
    //   .then((res) => res.json())
    //   .then((json) => {
    //     console.log(json);
    //     let map = new Map();
    //     let data = json.reduce((acc: Product[], cur: any) => {
    //       return acc.concat(cur.products);
    //     }, []);
    //     data.forEach((ele: Product) => {
    //       if (map.has(ele.productId)) {
    //         map.set(ele.productId, map.get(ele.productId) + ele.quantity);
    //       } else {
    //         map.set(ele.productId, ele.quantity);
    //       }
    //     });
    //     let promiseArr: any[] = [];
    //     map.forEach((val, key) => promiseArr.push(fetch(`${API_URL}/${key}`)));
    //     // console.log(map);
    //     Promise.all(promiseArr)
    //       .then((res) =>
    //         Promise.all(res.map((el) => el.json())).then((json) => {
    //           let data = json.reduce((acc, cur) => acc.concat(cur), []);
    //           data.forEach((ele: any) => (ele["quantity"] = map.get(ele.id)));
    //           console.log("data", data);
    //           setData(data);
    //         })
    //       )
    //       .catch((err) => console.log(err));
    //     // console.log(data, map);
    //   })
    //   .catch((err) => console.log(err));
  }, []);
  return (
    <section className="pt-24 pb-80">
      <section className="flex w-3/4 gap-36 pl-24 mt-24">
        <ul>
          {cart.map((ele) => (
            <li key={ele.id}>
              <div className="flex items-center gap-24">
                <Link
                  className="flex flex-col items-center justify-center"
                  style={{ height: "fit-content" }}
                  to={`/product/${ele.id}`}
                  key={ele.id}
                >
                  <figure className="w-56 h-80 flex items-center justify-center">
                    <img
                      src={ele.image}
                      alt=""
                      style={{ maxWidth: "80%", maxHeight: "80%" }}
                    />
                  </figure>
                </Link>
                <div className="flex flex-col gap-5">
                  <div className="font-black leading-normal text-lg">
                    <p>{ele.title}</p>
                    <p className="text-2xl font-bold">${ele.price}</p>
                  </div>
                  <div className="flex gap-5">
                    <button
                      onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                        onButtonClicked(e, ele);
                      }}
                      className="bg-blue-700 p-3 text-white rounded-l-md hover:bg-blue-900"
                    >
                      -
                    </button>
                    <button disabled className="font-bold">
                      {ele.quantity}
                    </button>
                    <button
                      onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                        onButtonClicked(e, ele);
                      }}
                      className="bg-blue-700 p-3 text-white rounded-r-md mr-12 hover:bg-blue-900"
                    >
                      +
                    </button>
                    <button
                      onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                        onButtonClicked(e, ele);
                      }}
                      className="border border-black hover:bg-black hover:text-white p-3"
                    >
                      삭제
                    </button>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
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
      </section>
    </section>
  );
}
