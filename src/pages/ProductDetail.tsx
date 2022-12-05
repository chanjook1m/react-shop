import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { useRecoilValue } from "recoil";
import { categoriesAtom } from "../atoms";

import ProductDetailSkeletonCard from "../components/skeleton/ProductDetailSkeletonCard";

import ProductDetailContainer from "../components/ProductDetail/ProductDetailContainer";

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

const API_URL = "https://fakestoreapi.com/products";

const STAR_NUM = 5;

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

  const categories = useRecoilValue(categoriesAtom);
  const [clicked, setClicked] = useState(new Array(STAR_NUM).fill(false));
  const [loading, setLoading] = useState(false);

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
        // console.log(clickStates);
        setClicked(() => clickStates);
        setTimeout(() => setLoading(false), 1000);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    setLoading(true);
    getData();
  }, [productId]);

  const findCategory = () => {
    let category = "";
    categories.forEach((ele) => {
      if (data.category.indexOf(ele.keyword as string) >= 0) {
        category = ele.name;
      }
    });

    return category;
  };

  return (
    <ProductDetailContainer>
      {loading && <ProductDetailSkeletonCard />}
      {!loading && (
        <ProductDetailContainer.ProductContainer>
          <ProductDetailContainer.ProductTitle>{`${findCategory()} > ${
            data.title
          }`}</ProductDetailContainer.ProductTitle>
          <ProductDetailContainer.ProductInfo data={data} star={clicked} />
        </ProductDetailContainer.ProductContainer>
      )}
    </ProductDetailContainer>
  );
}
