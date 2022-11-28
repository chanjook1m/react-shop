import { Link } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import "./newCarouselStyle.css";
import { Carousel } from "react-responsive-carousel";

interface Categories {
  path: string;
  name: string;
  keyword?: string;
}

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
  categories: Categories[];
  data: ProductInfo[];
};

const API_URL = "https://fakestoreapi.com/products";

export default function Main(props: MainProps) {
  return (
    <main className="pt-12 w-full object-contain">
      {/* 캐러셀 섹션 */}
      <section className="w-auto ">
        <Carousel
          showThumbs={false}
          showStatus={false}
          infiniteLoop={true}
          autoPlay={true}
          interval={3000}
        >
          {/* // Todo: CarouselItem, CarouselItemDescription 컴포넌트로 나누기 */}
          <div>
            <div className="absolute left-24 right-auto bottom-2/3 mb-10 text-left w-full text-white ">
              <h2 className="">상품 이름</h2>
              <p>설명</p>
              <a className="bg-gray-500">바로가기</a>
            </div>
            <img src="assets/2.jfif" style={{ objectFit: "contain" }} />
          </div>
          <div>
            <img src="assets/2.jfif" />
          </div>
          <div>
            <img src="assets/2.jfif" />
          </div>
        </Carousel>
      </section>

      {/* 프로덕트 카드 섹션 */}
      <section className="flex flex-col items-center">
        {props.categories.map((category) => (
          <section key={category.name}>
            <h2 className="flex justify-center">{category.name}</h2>
            <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-12 w-full">
              {props.data.map((item) => {
                if (item.category.indexOf(category.keyword as string) >= 0) {
                  return (
                    <Link
                      className="flex flex-col items-center justify-center"
                      style={{ height: "fit-content" }}
                      to={`/product/${item.id}`}
                      key={item.id}
                    >
                      <figure className="w-full h-80 flex items-center justify-center">
                        <img
                          src={item.image}
                          alt=""
                          style={{ maxWidth: "30%", maxHeight: "30%" }}
                        />
                      </figure>
                      <div className="">
                        <p>{item.title}</p>
                        <p>{item.price}</p>
                      </div>
                    </Link>
                  );
                }
              })}
            </div>
          </section>
        ))}
      </section>
    </main>
  );
}
