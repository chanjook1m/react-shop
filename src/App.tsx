import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { useRecoilValue } from "recoil";
import { categoriesAtom } from "./atoms";

import Header from "./components/common/Header/Header";
import Footer from "./components/common/Footer/Footer";
import { createGlobalStyle } from "styled-components";
import Main from "./pages/Main";
import ProductList from "./pages/ProductList";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";

import SkeletonCard from "./components/skeleton/MainSkeletonCard";
import useLimitedFetch from "./hooks/useLimitedFetch";

function App() {
  const categories = useRecoilValue(categoriesAtom);
  const { data, loading } = useLimitedFetch();

  return (
    <div className="w-full">
      <GlobalStyle />
      <div className="App">
        <BrowserRouter>
          <Header />
          <Routes>
            {loading && <Route path="/" element={<SkeletonCard />} />}
            {!loading && <Route path="/" element={<Main data={data} />} />}

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
