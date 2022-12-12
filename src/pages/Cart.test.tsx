import {
  render,
  act,
  renderHook,
  screen,
  waitFor,
} from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { RecoilRoot } from "recoil";

import Cart from "./Cart";
import "@testing-library/jest-dom";
import { useRecoilState } from "recoil";
import { cartAtom } from "../atoms";

import { Routes, Route, BrowserRouter } from "react-router-dom";

describe("Cart component", () => {
  it("renders Cart", async () => {
    const cartState = renderHook(
      () => {
        const [cart, setCart] = useRecoilState(cartAtom);
        return { cart, setCart };
      },
      {
        wrapper: RecoilRoot,
      }
    );

    act(() =>
      cartState.result.current.setCart([
        {
          id: 8,
          title: "Pierced Owl Rose Gold Plated Stainless Steel Double",
          price: 10.99,

          image:
            "https://fakestoreapi.com/img/51UDEzMJVpL._AC_UL640_QL65_ML3_.jpg",
          date: "2022-11-11",
          quantity: 4,
        },
      ])
    );

    render(
      <RecoilRoot>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Cart />} />
          </Routes>
        </BrowserRouter>
      </RecoilRoot>
    );

    await waitFor(
      () => {
        expect(
          screen.getByText(
            "Pierced Owl Rose Gold Plated Stainless Steel Double"
          )
        ).toBeInTheDocument();
      },
      { timeout: 3000 }
    );
  });
});
