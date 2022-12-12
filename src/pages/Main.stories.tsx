import { ComponentStory, ComponentMeta } from "@storybook/react";
import { withRouter } from "storybook-addon-react-router-v6";
import MainContainer from "../components/Main/MainContainer";
import SkeletonCard from "../components/skeleton/MainSkeletonCard";
import { useRecoilValue, RecoilRoot } from "recoil";
import { categoriesAtom } from "../atoms";
import useLimitedFetch from "../hooks/useLimitedFetch";

const Template: ComponentStory<typeof Main> = (args) => (
  <RecoilRoot>
    <Main {...args} />
  </RecoilRoot>
);

export default {
  component: Main,
  title: "Main",
  decorators: [withRouter],
  parameters: {
    reactRouter: {
      routePath: "/",
    },
  },
};

export const Default = Template.bind({});
export const Loading = Template.bind({});
Loading.args = { loading: true };

function Main(props: any) {
  const categories = useRecoilValue(categoriesAtom);
  const { data } = useLimitedFetch();

  if (props.loading) return <SkeletonCard />;

  return (
    <MainContainer>
      <MainContainer.CarouselList>
        <MainContainer.CarouselItem
          to="/fashion"
          title="새로운 상품!"
          desc="상품을 둘러보세요."
          img="assets/1.jpg"
        />
        <MainContainer.CarouselItem
          to="/fashion"
          title="새로운 상품!"
          desc="상품을 둘러보세요."
          img="assets/1.jpg"
        />
        <MainContainer.CarouselItem
          to="/fashion"
          title="새로운 상품!"
          desc="상품을 둘러보세요."
          img="assets/1.jpg"
        />
      </MainContainer.CarouselList>

      <MainContainer.ProductList>
        {categories.map((category, idx) => (
          <section key={category.name}>
            <MainContainer.ListTitle>{category.name}</MainContainer.ListTitle>
            <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-12 w-full">
              {data.map((item: any, idx: any) => {
                if (item.category.indexOf(category.keyword as string) >= 0) {
                  return <MainContainer.ProductItem key={idx} item={item} />;
                }
              })}
            </div>
          </section>
        ))}
      </MainContainer.ProductList>
    </MainContainer>
  );
}
