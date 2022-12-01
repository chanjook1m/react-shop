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
      <section className="w-3/4 mx-auto ">
        {props.categories.map((category) => (
          <section key={category.name}>
            <h2 className="flex justify-center text-3xl font-bold pt-24 mb-5 pr-5">
              {category.name}
            </h2>
            <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-12 w-full">
              {props.data.map((item) => {
                if (item.category.indexOf(category.keyword as string) >= 0) {
                  return (
                    <Link
                      className="flex xl:w-64 lg:w-48 h-96 flex-col items-center justify-center border border-b border-[lightgray] border-solid rounded-lg"
                      to={`/product/${item.id}`}
                      key={item.id}
                    >
                      <figure className="w-full h-96 flex items-center justify-center hover:scale-125 duration-500">
                        <img
                          src={item.image}
                          alt=""
                          style={{ maxWidth: "50%", maxHeight: "50%" }}
                        />
                      </figure>
                      <div className="flex flex-col justify-between w-full h-64 leading-normal p-3 bg-[lightgray]">
                        <p className="font-black">{item.title}</p>
                        <p>${item.price}</p>
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
