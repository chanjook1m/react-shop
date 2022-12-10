import { getLimitedDataHandler } from "./api/getLimitedData";
import { getCategoryDataHandler } from "./api/getCategoryData";
import { getProductDataHandler } from "./api/getProductData";

const handlers = [
  ...getLimitedDataHandler,
  ...getCategoryDataHandler,
  ...getProductDataHandler,
];

export default handlers;
