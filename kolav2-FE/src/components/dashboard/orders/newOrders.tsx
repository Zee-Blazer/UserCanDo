import OrdersTable, { OrdersTableProps } from "./ordersTable";

interface NewOrdersProps extends Omit<OrdersTableProps, "orderType"> {}

const NewOrders = (props: NewOrdersProps) => (
  <OrdersTable {...props} orderType="new" />
);

export default NewOrders;
