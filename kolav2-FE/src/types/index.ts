export type TOrderFilter =
  | "all"
  | "pending"
  | "shipped"
  | "delivered"
  | "cancelled";

export type TOrderFilters = {
  [key: string]: TOrderFilter;
};

export interface IOrderItem {
  id: number;
  adjective: string;
  name: string;
  quantity: number;
  size: string;
  price: number;
  img: string;
}

export interface IOrderUpdate {
  title: string;
  time: string;
  done: boolean;
}

export interface IOrder {
  id: string;
  status: string;
  storeName: string;
  price: number;
  location: string;
  createdAt: string;
  items: IOrderItem[];
  orderUpdate: IOrderUpdate[];
}

export interface IMessage {
  content: string;
  sender: string;
  time: string;
}

export type NavItemType = {
  label: string;
  href: string;
  icon: React.ElementType;
  permission?: string;
};

export * from "./userRole";

export * from "./shopper";
