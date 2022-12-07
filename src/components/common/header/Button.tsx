import React from "react";
import { FaRegMoon, FaRegSun } from "react-icons/fa";
import { useRecoilState } from "recoil";
import { themeAtom } from "../../../atoms";

type ButtonProps = {
  children?: React.ReactNode;
  type: string;
};

function Button({ type }: ButtonProps) {
  let content;

  const [theme, setTheme] = useRecoilState(themeAtom);

  const handleButtonClick = () => {
    theme === "light" ? setTheme("dark") : setTheme("light");
    if (localStorage.theme.replaceAll('"', "") === "dark") {
      console.log("add");
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  switch (type) {
    case "theme":
      content = theme === "light" ? <FaRegMoon /> : <FaRegSun />;
      break;
    default:
      break;
  }
  return (
    <button name="theme-button" onClick={handleButtonClick}>
      {content}
    </button>
  );
}

export default Button;
