import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
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
  const [page, setPage] = useState(1);
  const limit = 4;
  const offset = (page - 1) * limit;
  const navigate = useNavigate();
  const location = useLocation();

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

  useEffect(() => {
    setPage(1);
  }, [location.pathname]);

  return (
    <ProductListContainer>
      <ProductListContainer.Title>{`홈 > ${props.children}`}</ProductListContainer.Title>
      {loading && <ProductListSkeletonCard />}
      {!loading && (
        <ProductListContainer.ProductList>
          {data.slice(offset, offset + limit).map((item) => (
            <ProductListContainer.ProductItem item={item} />
          ))}
        </ProductListContainer.ProductList>
      )}
      <ProductListContainer.Paging
        page={page}
        count={data.length}
        setPage={setPage}
        limit={limit}
      />
    </ProductListContainer>
  );
}
