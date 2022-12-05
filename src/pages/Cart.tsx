import { useEffect, useState } from "react";

import { useRecoilState } from "recoil";
import { cartAtom } from "../atoms";

import CartSkeletonCard from "../components/skeleton/Cart.SkeletonCard";

import CartContainer from "../components/Cart/CartContainer";

type CartProps = {
  children?: React.ReactNode;
};

export default function Cart(props: CartProps) {
  const [cart, setCart] = useRecoilState(cartAtom);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => setLoading(false), 1500);
  }, []);

  return (
    <CartContainer>
      {loading && <CartSkeletonCard />}
      {!loading && (
        <CartContainer.CartList>
          <ul>
            {cart.map((ele) => (
              <li key={ele.id}>
                <CartContainer.CartItem item={ele} />
              </li>
            ))}
          </ul>

          <CartContainer.CartTotal />
        </CartContainer.CartList>
      )}
    </CartContainer>
  );
}
