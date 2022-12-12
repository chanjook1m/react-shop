import useProductFetch from "../hooks/useProductFetch";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { withRouter } from "storybook-addon-react-router-v6";
import ProductDetailContainer from "../components/ProductDetail/ProductDetailContainer";
import ProductDetailSkeletonCard from "../components/skeleton/ProductDetailSkeletonCard";
import { useRecoilValue, RecoilRoot } from "recoil";
import { categoriesAtom } from "../atoms";

const Template: ComponentStory<typeof ProductDetail> = (args) => (
  <RecoilRoot>
    <ProductDetail {...args} />
  </RecoilRoot>
);

export default {
  component: ProductDetail,
  title: "ProductDetail",
  decorators: [withRouter],
  parameters: {
    reactRouter: {
      routePath: "/product/",
    },
  },
};

export const Default = Template.bind({});
Default.args = { productId: 1 };

export const Loading = Template.bind({});
Loading.args = { productId: 1, loading: true };

function ProductDetail(props: any) {
  const categories = useRecoilValue(categoriesAtom);
  let productId = props.productId;
  const { data, clicked } = useProductFetch(productId as string);
  const loading = props.loading;

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
