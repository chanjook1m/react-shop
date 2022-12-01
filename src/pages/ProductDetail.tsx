import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";

import { useRecoilState } from "recoil";
import { cartAtom } from "../atoms";

import { FaStar } from "react-icons/fa";

interface Categories {
  path: string;
  name: string;
  keyword?: string;
}

type ProductDetailProps = {
  children?: React.ReactNode;
  categories: Categories[];
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

const STAR_NUM = 5;
const starArr = new Array(STAR_NUM).fill(0);

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
  const [clicked, setClicked] = useState(new Array(STAR_NUM).fill(false));

  let productId = useParams().productId;

  const getData = () => {
    fetch(`${API_URL}/${productId}`)
      .then((res) => res.json())
      .then((newData) => {
        setData(newData);
        return newData;
      })
      .then((data) => {
        let num = Math.round(data.rating.rate);
        let clickStates = new Array(STAR_NUM).fill(false);

        for (let i = 0; i < num; i++) {
          clickStates[i] = true;
        }
        console.log(clickStates);
        setClicked(() => clickStates);
      })
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
  }, [productId]);

  const findCategory = () => {
    let category = "";
    props.categories.forEach((ele) => {
      if (data.category.indexOf(ele.keyword as string) >= 0) {
        category = ele.name;
      }
    });

    return category;
  };

  return (
    <section className="pt-24 pb-80">
      <h2 className="text-lg font-bold pl-24 pt-12">{`${findCategory()} > ${
        data.title
      }`}</h2>
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
                  className={clicked[idx] && "text-yellow-500"}
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
            <button
              className="text-sm p-3 rounded border border-black hover:bg-black hover:text-white"
              onClick={onButtonClicked}
            >
              장바구니로 이동
            </button>
          </div>
        </div>
      </section>
    </section>
  );
}
