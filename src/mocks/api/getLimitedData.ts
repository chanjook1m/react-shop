import { rest } from "msw";
const API_URL = "https://fakestoreapi.com/products/category";

import { dataForGetLimitedData } from "./data/dataForGetLimitedData";
const categories = [
  { path: "/fashion", name: "패션", keyword: "clothing" },
  { path: "/accessory", name: "엑세서리", keyword: "jewelery" },
  { path: "/digital", name: "디지털", keyword: "electronics" },
];

const getLimitedDataHandler = [
  rest.get(`${API_URL}/men%27s%20clothing`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(dataForGetLimitedData.data));
  }),
];

export { getLimitedDataHandler };
