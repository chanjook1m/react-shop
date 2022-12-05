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
    <div className="hover:bg-gray-200 p-3 rounded">
      <Link to="/cart">
        <FaShoppingCart />
        <span>{getTotalQuantity()}</span>
      </Link>
    </div>
  );
}

export default Cart;
