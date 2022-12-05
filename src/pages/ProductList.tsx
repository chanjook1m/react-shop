import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ProductListSkeletonCard from "../components/skeleton/ProductListSkeleton";

import ProductListContainer from "../components/ProductList/ProductListContainer";

type ProductListProps = {
  children?: React.ReactNode;
  category: string;
};

interface ProductInfo {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating?: object;
}

const API_URL = "https://fakestoreapi.com/products/category";

export default function ProductList(props: ProductListProps) {
  const [data, setData] = useState<ProductInfo[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const getData = (category: string) => {
    switch (category) {
      case "clothing":
        let men = fetch(`${API_URL}/men's clothing`);
        let women = fetch(`${API_URL}/women's clothing`);

        Promise.all([men, women])
          .then((res) =>
            Promise.all(res.map((el) => el.json())).then((json) => {
              let data = json.reduce((acc, cur) => acc.concat(cur), []);
              setData(data);
              setTimeout(() => setLoading(false), 1000);
            })
          )
          .catch((err) => console.log(err));

        break;
      case "jewelery":
      case "electronics":
        fetch(`${API_URL}/${category}`)
          .then((res) => res.json())
          .then((newData) => {
            setData(newData);
            setTimeout(() => setLoading(false), 1000);
          })
          .catch((err) => console.log(err));
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    setLoading(true);
    getData(props.category);
  }, [navigate]);

  return (
    <ProductListContainer>
      <ProductListContainer.Title>{`홈 > ${props.children}`}</ProductListContainer.Title>
      {loading && <ProductListSkeletonCard />}
      {!loading && (
        <ProductListContainer.ProductList>
          {data.map((item) => (
            <ProductListContainer.ProductItem item={item} />
          ))}
        </ProductListContainer.ProductList>
      )}
    </ProductListContainer>
  );
}
