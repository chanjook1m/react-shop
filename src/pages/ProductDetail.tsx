import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { useRecoilState } from "recoil";
import { cartAtom } from "../atoms";

type ProductDetailProps = {
  children?: React.ReactNode;
};

interface ProductInfo {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: { rate: number; count: number };
}

interface CartItemInfo {
  id: number;
  title: string;
  price: number;
  quantity: number;
  date: string;
  image: string;
}

const API_URL = "https://fakestoreapi.com/products";

export default function ProductDetail(props: ProductDetailProps) {
  const [data, setData] = useState<ProductInfo>({
    id: 0,
    title: "",
    price: 0,
    description: "",
    category: "",
    image: "",
    rating: { rate: 0, count: 0 },
  });
  const [cart, setCart] = useRecoilState(cartAtom);

  let productId = useParams().productId;

  const getData = () => {
    fetch(`${API_URL}/${productId}`)
      .then((res) => res.json())
      .then((newData) => setData(newData))
      .catch((err) => console.log(err));
  };

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

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <img src={data.image} alt="" />
      <div>{data.title}</div>
      <div>{data.description}</div>
      <div>{data.price}</div>
      <div>{data.rating.rate}</div>
      <div>{data.rating.count}</div>
      <button onClick={onButtonClicked}>장바구니에 담기</button>
    </div>
  );
}
