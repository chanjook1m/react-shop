import React from "react";

interface CompanyProps {
  children?: React.ReactNode;
  name: string;
}

function Company({ name }: CompanyProps) {
  return <div>{name}</div>;
}

export default Company;
