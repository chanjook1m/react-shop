import React from "react";
import { FaRegMoon, FaRegSun } from "react-icons/fa";

type ButtonProps = {
  children?: React.ReactNode;
  type: string;
};

function Button({ type }: ButtonProps) {
  let content;
  switch (type) {
    case "darkmode":
      // 전역 변수에 따라서 아이콘 변경
      content = <FaRegMoon />;
      break;
    default:
      break;
  }
  return <button>{content}</button>;
}

export default Button;
