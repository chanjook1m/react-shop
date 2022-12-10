import { render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { RecoilRoot } from "recoil";

import Main from "./Main";
import "@testing-library/jest-dom";

import { Routes, Route, BrowserRouter } from "react-router-dom";
import { dataForGetLimitedData } from "../mocks/api/data/dataForGetLimitedData";

describe("Main component", () => {
  it("renders product list", async () => {
    render(
      <RecoilRoot>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={<Main data={dataForGetLimitedData.data} />}
            />
          </Routes>
        </BrowserRouter>
      </RecoilRoot>
    );

    await waitFor(() =>
      expect(
        screen.getByText(
          "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops"
        )
      ).toBeInTheDocument()
    );
  });
});
