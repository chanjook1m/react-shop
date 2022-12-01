import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ProductListSkeletonCard from "../components/skeleton/ProductListSkeleton";

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
    console.log(data);
  }, [navigate]);

  return (
    <>
      <div className="pt-24 mb-24 ml-80 text-lg font-bold">{`홈 > ${props.children}`}</div>
      {loading && <ProductListSkeletonCard />}
      {!loading && (
        <section className="w-3/4 mx-auto">
          {/* <h2 className="flex justify-center">{category}</h2> */}
          <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-12 w-full">
            {data.map((item) => {
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
            })}
          </div>
        </section>
      )}
    </>
  );
}
