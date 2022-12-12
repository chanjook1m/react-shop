import { useParams } from "react-router-dom";

import { useRecoilValue } from "recoil";
import { categoriesAtom } from "../atoms";

import ProductDetailSkeletonCard from "../components/skeleton/ProductDetailSkeletonCard";

import ProductDetailContainer from "../components/ProductDetail/ProductDetailContainer";

import useProductFetch from "../hooks/useProductFetch";
import { TEST_PRODUCT_ID } from "../shared/constants";

type ProductDetailProps = {
  children?: React.ReactNode;
};

export default function ProductDetail(props: ProductDetailProps) {
  const categories = useRecoilValue(categoriesAtom);
  let productId = useParams().productId || TEST_PRODUCT_ID;
  const { data, loading, clicked } = useProductFetch(productId as string);

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
