import OrdersTable, { OrdersTableProps } from "./ordersTable";

const DeliveredOrders = (props: Omit<OrdersTableProps, "orderType">) => (
  <OrdersTable {...props} orderType="delivered" />
);

export default DeliveredOrders;
