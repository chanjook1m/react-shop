import { render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { RecoilRoot } from "recoil";

import ProductDetail from "./ProductDetail";
import "@testing-library/jest-dom";

import { Routes, Route, BrowserRouter } from "react-router-dom";

describe("ProductDetail component", () => {
  it("renders product detail", async () => {
    render(
      <RecoilRoot>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<ProductDetail />} />
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
