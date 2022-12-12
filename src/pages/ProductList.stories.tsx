import React, { useState, useEffect } from "react";
import useCategoryFetch from "../hooks/useCategoryFetch";
import { useLocation } from "react-router-dom";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { withRouter } from "storybook-addon-react-router-v6";
import ProductListContainer from "../components/ProductList/ProductListContainer";
import ProductListSkeletonCard from "../components/skeleton/ProductListSkeleton";

export default {
  component: ProductList,
  title: "ProductList",
  decorators: [withRouter],
  parameters: {
    reactRouter: {
      routePath: "/accessory",
    },
  },
};

const Template: ComponentStory<typeof ProductList> = (args) => (
  <ProductList {...args}>악세서리</ProductList>
);

export const Default = Template.bind({});
Default.args = { category: "jewelery" };

export const Loading = Template.bind({});
Loading.args = { loading: true };

function ProductList(props: any) {
  const [page, setPage] = useState(1);
  const { data } = useCategoryFetch(props.category);
  const loading = props.loading;

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
            <ProductListContainer.ProductItem key={item.title} item={item} />
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
