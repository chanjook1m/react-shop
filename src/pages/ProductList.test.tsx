import { render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { RecoilRoot } from "recoil";

import ProductList from "./ProductList";
import "@testing-library/jest-dom";

import { Routes, Route, BrowserRouter } from "react-router-dom";

describe("ProductList component", () => {
  it("renders product list", async () => {
    render(
      <RecoilRoot>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={<ProductList category="jewelery">악세서리</ProductList>}
            />
          </Routes>
        </BrowserRouter>
      </RecoilRoot>
    );

    await waitFor(
      () => {
        expect(
          screen.getByText("White Gold Plated Princess")
        ).toBeInTheDocument();
      },
      { timeout: 3000 }
    );
  });
});
