import React from "react";
import { Link } from "react-router-dom";

type NavigationProps = {
  children?: React.ReactNode;
  options: Category[];
};

interface Category {
  path: string;
  name: string;
  keyword: string;
}

function Navigation({ options }: NavigationProps) {
  return (
    <nav>
      <ul className="flex space-x-4">
        {options.map((option) => (
          <li key={option.name}>
            <Link
              to={option.path}
              className="hover:bg-gray-200 p-3 rounded"
              onClick={() => console.log("link")}
            >
              {option.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Navigation;
