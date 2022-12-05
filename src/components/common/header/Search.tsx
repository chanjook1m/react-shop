import React, { useState, useMemo, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { debounce } from "lodash";

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

function Search() {
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
    <>
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
                        if (inputRef.current) inputRef.current.value = "";
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
    </>
  );
}

export default Search;
