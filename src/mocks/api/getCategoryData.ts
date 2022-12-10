import { rest } from "msw";
const API_URL = "https://fakestoreapi.com/products/category";

import { dataForGetCategoryData } from "./data/dataForGetCategoryData";

const getCategoryDataHandler = [
  rest.get(`${API_URL}/jewelery`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(dataForGetCategoryData.data));
  }),
];

export { getCategoryDataHandler };
