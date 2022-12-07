const API_URL = "https://fakestoreapi.com/products/category";
import { useState, useEffect } from "react";
import { useRecoilValue } from "recoil";
import { categoriesAtom } from "../atoms";

interface ProductInfo {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating?: object;
}

const useLimitedFetch = () => {
  const [data, setData] = useState<ProductInfo[]>([]);
  const [loading, setLoading] = useState(false);
  const categories = useRecoilValue(categoriesAtom);

  const getLimitedData = (category: string, num: number) => {
    let ctgry = category === "clothing" ? "men's clothing" : category;
    fetch(`${API_URL}/${ctgry}?limit=${num}`)
      .then((res) => res.json())
      .then((newData) => {
        setData((prev) => [...prev, ...newData].sort((a, b) => a.id - b.id));
        setTimeout(() => setLoading(false), 1000);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    setLoading(true);
    categories.map((category) => getLimitedData(category.keyword, 4));
  }, []);

  return { data, loading };
};

export default useLimitedFetch;
