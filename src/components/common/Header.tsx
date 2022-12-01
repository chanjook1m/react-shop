import { useState, useMemo, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { debounce } from "lodash";
import { FaRegMoon, FaRegSun, FaShoppingCart } from "react-icons/fa";
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
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

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
    if (e.target.value) {
      debouncedSearch(e.target.value);
      setShow(true);
    } else setData([]);
    console.log(data);
  };

  return (
    <header className="w-full fixed top-0 left-0 h-16 shadow z-10 bg-white font-bold text-black">
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
                      <Link
                        to={category.path}
                        className="hover:bg-gray-200 p-3 rounded"
                        onCLick={() => console.log("link")}
                      >
                        {category.name}
                      </Link>
                    </li>
                  );
              })}
            </ul>
          </nav>
        </div>
        <div className="header-right">
          <ul className="flex space-x-4 items-center">
            <li>
              <button>
                <FaRegMoon />
              </button>
            </li>
            <li>
              <input
                type="text"
                placeholder="검색"
                onChange={onChange}
                onBlur={(e) => {
                  setTimeout(() => setShow(false), 100);
                }}
                ref={inputRef}
                className="outline-none bg-gray-100 p-3 rounded"
              />
              <div
                style={{
                  position: "absolute",
                  overflowY: "auto",
                  height: 200,
                  backgroundColor: "white",
                }}
              >
                <ul className="flex flex-col">
                  {show &&
                    data &&
                    data.map(
                      (ele) =>
                        ele.title.indexOf(query) >= 0 && (
                          <li
                            key={ele.title}
                            className="p-5 hover:bg-[lightgray] rounded"
                          >
                            <a
                              onClick={(e) => {
                                if (inputRef.current)
                                  inputRef.current.value = "";
                                setQuery("");
                                setData([]);
                                navigate(`/product/${ele.id}`);
                              }}
                              className="w-full h-full line-clamp-2 cursor-pointer"
                            >
                              {ele.title}
                            </a>
                          </li>
                        )
                    )}
                </ul>
              </div>
            </li>
            <li>
              <div className="hover:bg-gray-200 p-3 rounded">
                <Link to="/cart">
                  <FaShoppingCart />
                </Link>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
