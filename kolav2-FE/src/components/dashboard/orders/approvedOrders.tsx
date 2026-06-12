import OrdersTable, { OrdersTableProps } from "./ordersTable";

const ApprovedOrders = (props: Omit<OrdersTableProps, "orderType">) => (
  <OrdersTable {...props} orderType="approved" />
);

export default ApprovedOrders;
