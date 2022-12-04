import { atom } from "recoil";

interface CartItemInfo {
  id: number;
  title: string;
  price: number;
  quantity: number;
  date: string;
  image: string;
}

interface CategoryInfo {
  path: string;
  name: string;
  keyword: string;
}

const localStorageEffect =
  (key: string) =>
  ({ setSelf, onSet }: any) => {
    const savedValue = localStorage.getItem(key);
    // localstorage의 user_list에 해당되는 값 -> savedValue가 null	이라면
    if (savedValue != null) {
      setSelf(JSON.parse(savedValue));
    }

    onSet((newValue: any, _: any, isReset: boolean) => {
      const confirm = newValue.length === 0;
      confirm
        ? localStorage.removeItem(key)
        : localStorage.setItem(key, JSON.stringify(newValue));
    });
  };

export const cartAtom = atom<CartItemInfo[]>({
  key: "cart",
  default: [],
  effects: [localStorageEffect("cart_list")],
});

export const categoriesAtom = atom<CategoryInfo[]>({
  key: "categories",
  default: [
    { path: "/fashion", name: "패션", keyword: "clothing" },
    { path: "/accessory", name: "엑세서리", keyword: "jewelery" },
    { path: "/digital", name: "디지털", keyword: "electronics" },
  ],
});
