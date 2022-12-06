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
    <div className="hover:bg-gray-100 px-3 rounded">
      <Link className="px-5" to="/cart">
        <FaShoppingCart />
        <span className="relative bottom-6 left-2 rounded-3xl px-1.5 text-sm text-white bg-red-500">
          {getTotalQuantity()}
        </span>
      </Link>
    </div>
  );
}

export default Cart;
