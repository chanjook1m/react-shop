import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { RecoilRoot } from "recoil";

import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import { createGlobalStyle } from "styled-components";
import Main from "./pages/Main";
import ProductList from "./pages/ProductList";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";

import SkeletonCard from "./components/skeleton/MainSkeletonCard";

const categories = [
  { path: "/fashion", name: "패션", keyword: "clothing" },
  { path: "/accessory", name: "엑세서리", keyword: "jewelery" },
  { path: "/digital", name: "디지털", keyword: "electronics" },
];

const API_URL = "https://fakestoreapi.com/products/category";
const LOGIN_API_URL = "https://fakestoreapi.com/auth/login";

interface ProductInfo {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating?: object;
}

function App() {
  const [data, setData] = useState<ProductInfo[]>([]);
  const [loading, setLoading] = useState(false);

  const getLimitedData = (category: string, num: number) => {
    let ctgry = category === "clothing" ? "men's clothing" : category;
    fetch(`${API_URL}/${ctgry}?limit=${num}`)
      .then((res) => res.json())
      .then((newData) => {
        setData((prev) => [...prev, ...newData].sort((a, b) => a.id - b.id));
        setTimeout(() => setLoading(false), 1000);
      })
      .catch((err) => console.log(err));
  };
  console.log(data);

  const login = () => {
    fetch(`${LOGIN_API_URL}`, {
      method: "POST",
      body: JSON.stringify({
        username: "johnd",
        password: "m38rmF$",
      }),
    })
      .then((res) => res.json())
      .then((json) => console.log(json))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    setLoading(true);
    categories.map((category) => getLimitedData(category.keyword, 4));
    // login();
  }, []);

  return (
    <RecoilRoot>
      <div className="w-full">
        <GlobalStyle />
        <div className="App">
          <BrowserRouter>
            <Header categories={categories} />
            <Routes>
              {loading && <Route path="/" element={<SkeletonCard />} />}
              {!loading && (
                <Route
                  path="/"
                  element={<Main categories={categories} data={data} />}
                />
              )}

              {categories.map((category) => (
                <Route
                  path={category.path}
                  element={
                    <ProductList category={category.keyword}>
                      {category.name}
                    </ProductList>
                  }
                />
              ))}

              <Route path="/cart" element={<Cart />} />
              <Route path="/product/:productId" element={<ProductDetail />} />
            </Routes>
            <Footer />
          </BrowserRouter>
        </div>
      </div>
    </RecoilRoot>
  );
}

export default App;

const GlobalStyle = createGlobalStyle`
/* http://meyerweb.com/eric/tools/css/reset/ 
v2.0 | 20110126
License: none (public domain)
*/

html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
margin: 0;
padding: 0;
border: 0;
font-size: 100%;
font: inherit;
vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
display: block;
}
body {
line-height: 1;
}
ol, ul {
list-style: none;
}
blockquote, q {
quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
content: '';
content: none;
}
table {
border-collapse: collapse;
border-spacing: 0;
}
`;
