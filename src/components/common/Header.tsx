import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { debounce } from "lodash";

interface Categories {
  path: string;
  name: string;
  keyword?: string;
}

type HeaderProps = {
  children?: React.ReactNode;
  categories: Categories[];
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

const API_URL = "https://fakestoreapi.com/products";

export default function Header(props: HeaderProps) {
  const [data, setData] = useState<ProductInfo[]>([]);
  const [query, setQuery] = useState<string>("");

  const debouncedSearch = useMemo(
    () =>
      debounce((query: any) => {
        // 모든 호출이 아닌
        // 지정 간격 마다 리턴 값 받아서 state에 담고
        setQuery(query);

        // 그 값으로 API 데이터 가져오기
        fetch(`${API_URL}`)
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            setData(data);
          });
      }, 200),
    [query]
  );

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) debouncedSearch(e.target.value);
    else setData([]);
    console.log(data);
  };

  return (
    <header className="w-full fixed top-0 left-0 h-16 shadow z-10 bg-white">
      <div className="w-11/12 h-full flex max-w-screen-xl justify-between my-0 mx-auto items-center">
        <div className="header-left flex space-x-6">
          <div>
            <Link to="/">React Shop</Link>
          </div>
          <nav>
            <ul className="flex space-x-4">
              {props.categories.map((category) => {
                if (category.name !== "")
                  return (
                    <li key={category.name}>
                      <Link to={category.path}>{category.name}</Link>
                    </li>
                  );
              })}
            </ul>
          </nav>
        </div>
        <div className="header-right">
          <ul className="flex space-x-4">
            <li>dark</li>
            <li>
              <input type="text" placeholder="검색" onChange={onChange} />
              <div
                style={{
                  position: "absolute",
                  overflowY: "auto",
                  height: 200,
                  backgroundColor: "white",
                }}
              >
                <ul className="flex flex-col">
                  {data &&
                    data.map(
                      (ele) =>
                        ele.title.indexOf(query) >= 0 && (
                          <li
                            key={ele.title}
                            className="p-5 hover:bg-[lightgray] rounded"
                          >
                            <Link
                              to={`/product/${ele.id}`}
                              className="w-full h-full  line-clamp-2"
                            >
                              {ele.title}
                            </Link>
                          </li>
                        )
                    )}
                </ul>
              </div>
            </li>
            <li>
              <Link to="/cart">cart</Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
