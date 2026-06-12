import OrdersTable, { OrdersTableProps } from "./ordersTable";

const OutForDelivery = (props: Omit<OrdersTableProps, "orderType">) => (
  <OrdersTable {...props} orderType="out for delivery" />
);

export default OutForDelivery;
