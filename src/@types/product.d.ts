declare module "product" {
  interface ItemInfo {
    id: number;
    title: string;
    price: number;
    image: string;
  }

  interface CartItemInfo {
    id: number;
    title: string;
    price: number;
    quantity: number;
    date: string;
    image: string;
  }

  interface ProductInfo {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating?: object;
  }

  export { ItemInfo, CartItemInfo, ProductInfo };
}
