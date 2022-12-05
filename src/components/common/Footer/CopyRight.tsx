import React from "react";

interface CopyRightProps {
  children?: React.ReactNode;
  year?: number;
  company?: string;
}

function CopyRight({ year, company }: CopyRightProps) {
  return <div>CopyRight© {`${year} ${company}`}</div>;
}

export default CopyRight;
