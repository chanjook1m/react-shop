import { useRecoilValue } from "recoil";
import { categoriesAtom } from "../atoms";

import MainContainer from "../components/Main/MainContainer";

interface ProductInfo {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating?: object;
}

type MainProps = {
  children?: React.ReactNode;
  data: ProductInfo[];
};

export default function Main(props: MainProps) {
  const categories = useRecoilValue(categoriesAtom);
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
        {categories.map((category) => (
          <section key={category.name}>
            <MainContainer.ListTitle>{category.name}</MainContainer.ListTitle>
            <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-12 w-full">
              {props.data.map((item) => {
                if (item.category.indexOf(category.keyword as string) >= 0) {
                  return <MainContainer.ProductItem item={item} />;
                }
              })}
            </div>
          </section>
        ))}
      </MainContainer.ProductList>
    </MainContainer>
  );
}
