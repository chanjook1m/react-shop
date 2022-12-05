import React from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { useRecoilValue } from "recoil";
import { cartAtom } from "../../../atoms";

function Cart() {
  const cart = useRecoilValue(cartAtom);
  const getTotalQuantity = () => {
    return cart.reduce((acc, cur) => {
      return acc + cur.quantity;
    }, 0);
  };

  return (
    <div className="hover:bg-gray-200 p-1 rounded flex">
      <Link className="p-2" to="/cart">
        <FaShoppingCart />
        <span className="absolute top-3 right-12 rounded-3xl px-1.5 text-sm text-white bg-red-500">
          {getTotalQuantity()}
        </span>
      </Link>
    </div>
  );
}

export default Cart;
