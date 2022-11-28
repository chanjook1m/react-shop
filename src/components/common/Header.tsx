import { Link } from "react-router-dom";

interface Categories {
  path: string;
  name: string;
  keyword?: string;
}

type HeaderProps = {
  children?: React.ReactNode;
  categories: Categories[];
};

export default function Header(props: HeaderProps) {
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
            <li>search</li>
            <li>
              <Link to="/cart">cart</Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
