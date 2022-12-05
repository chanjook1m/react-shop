import React from "react";
import { Link } from "react-router-dom";

type LogoProps = {
  children?: React.ReactNode;
  path?: string;
  title: string;
};

function Logo({ title, path }: LogoProps) {
  return (
    <div>
      <Link to="/">{title}</Link>
    </div>
  );
}

export default Logo;
