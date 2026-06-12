import OrdersTable, { OrdersTableProps } from "./ordersTable";

const CancelledOrders = (props: Omit<OrdersTableProps, "orderType">) => (
  <OrdersTable {...props} orderType="cancelled" />
);

export default CancelledOrders;
