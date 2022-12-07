import { useRecoilValue } from "recoil";
import { cartAtom } from "../atoms";

const getTotalQuantity = () => {
  const cart = useRecoilValue(cartAtom);
  return cart.reduce((acc, cur) => {
    return acc + cur.quantity;
  }, 0);
};

const getTotalPrice = () => {
  const cart = useRecoilValue(cartAtom);
  return cart
    .reduce((acc, cur) => {
      return acc + cur.price * cur.quantity;
    }, 0)
    .toFixed(2);
};

export { getTotalQuantity, getTotalPrice };
