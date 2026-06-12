import { Typography } from "@material-tailwind/react";

const OrderSummary = () => {
  return (
    <main className="bg-[#F8FAFB] py-10 rounded-sm h-auto">
      <header>
        <Typography variant="h5" className="font-bold text-center">
          Order Summary
        </Typography>
      </header>
      <section className="flex px-2 mt-4 flex-col gap-4">
        <div className="flex items-center justify-between">
          <span className="text-sm">Amount</span>
          <Typography className="font-semibold text-sm">
            GHS 40, 000, 000.00
          </Typography>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm">Mark up</span>
          <Typography className="font-semibold text-sm">
            +GHS 43, 000, 000.00
          </Typography>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm">Total(Amount + Markup)</span>
          <Typography className="font-semibold text-sm">
            GHS 443, 000, 000.00
          </Typography>
        </div>
      </section>
    </main>
  );
};

export default OrderSummary;
