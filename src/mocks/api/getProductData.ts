import { rest } from "msw";
const API_URL = "https://fakestoreapi.com/products";

import { dataForGetProductData } from "./data/dataForGetPProductData";

const getProductDataHandler = [
  rest.get(`${API_URL}/7`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(dataForGetProductData.data));
  }),
];

export { getProductDataHandler };
