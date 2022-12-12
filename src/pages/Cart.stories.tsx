import { ComponentStory, ComponentMeta } from "@storybook/react";
import { withRouter } from "storybook-addon-react-router-v6";
import CartContainer from "../components/Cart/CartContainer";
import CartSkeletonCard from "../components/skeleton/Cart.SkeletonCard";
import { useRecoilState, RecoilRoot } from "recoil";
import { cartAtom } from "../atoms";

const Template: ComponentStory<typeof Cart> = (args) => (
  <RecoilRoot>
    <Cart {...args} />
  </RecoilRoot>
);

export default {
  component: Cart,
  title: "Cart",
  decorators: [withRouter],
  parameters: {
    reactRouter: {
      routePath: "/cart",
    },
  },
};

export const Default = Template.bind({});
Default.args = {
  cart: [
    {
      id: 8,
      title: "Pierced Owl Rose Gold Plated Stainless Steel Double",
      price: 10.99,

      image: "https://fakestoreapi.com/img/51UDEzMJVpL._AC_UL640_QL65_ML3_.jpg",
      date: "2022-11-11",
      quantity: 4,
    },
  ],
};

export const Loading = Template.bind({});
Loading.args = { loading: true };

function Cart(props: any) {
  const [cart, setCart] = useRecoilState(cartAtom);
  if (props.cart) setCart(props.cart);

  const loading = props.loading;

  return (
    <CartContainer>
      {loading && <CartSkeletonCard />}
      {!loading && (
        <CartContainer.CartList>
          <ul>
            {cart.map((ele, idx) => (
              <li key={idx}>
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
