import { useEffect, useState } from "react";
import { STAR_NUM } from "../shared/constants";

const API_URL = "https://fakestoreapi.com/products";

interface ProductInfo {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: { rate: number; count: number };
}

const useProductFetch = (productId: string) => {
  const [clicked, setClicked] = useState(new Array(STAR_NUM).fill(false));
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<ProductInfo>({
    id: 0,
    title: "",
    price: 0,
    description: "",
    category: "",
    image: "",
    rating: { rate: 0, count: 0 },
  });

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

  return { data, loading, clicked };
};

export default useProductFetch;
