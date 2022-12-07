import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ProductListSkeletonCard from "../components/skeleton/ProductListSkeleton";

import ProductListContainer from "../components/ProductList/ProductListContainer";
import useCategoryFetch from "../hooks/useCategoryFetch";
type ProductListProps = {
  children?: React.ReactNode;
  category: string;
};

export default function ProductList(props: ProductListProps) {
  const [page, setPage] = useState(1);
  const { data, loading } = useCategoryFetch(props.category);
  const limit = 4;
  const offset = (page - 1) * limit;
  const location = useLocation();

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
