import React, { useState } from "react";
import { Button } from "@material-tailwind/react";
import { HorizontalDivider } from "@/components/General/divider";
import { formatDate, getPaymentStatusStyle } from "@/utils/helpers";

interface PaybackFormProps {
  selectedTerm?: any;
  onPayNow?: (installmentId: string) => void;
  isLoading?: boolean;
}

const PaybackForm = ({
  selectedTerm,
  onPayNow,
  isLoading = false,
}: PaybackFormProps) => {
  const [showAllInstallments, setShowAllInstallments] = useState(false);

  const installments = selectedTerm?.installments || [];

  const isPayNowEnabled = (installment: any, index: number) => {
    const currentDate = new Date();
    const dueDate = new Date(installment?.due_date);

    if (installment?.status === "paid") return false;

    if (installment?.status === "overdue" || dueDate < currentDate) return true;

    if (index === 0) return dueDate <= currentDate;

    const previousInstallments = installments.slice(0, index) || [];
    const allPreviousPaid = previousInstallments.every(
      (prev: any) => prev.status === "paid"
    );

    return allPreviousPaid && dueDate <= currentDate;
  };

  const handlePayNow = async (installmentIndex: number) => {
    if (!installments[installmentIndex]) return;

    const installmentId = installments[installmentIndex].id;
    if (onPayNow) {
      await onPayNow(installmentId);
    }
  };

  const getInstallmentPlanType = () => {
    const markupType = selectedTerm?.markup_type;
    if (markupType?.includes("monthly")) {
      return "Monthly Plan";
    } else if (markupType?.includes("weekly")) {
      return "Weekly Plan";
    } else if (markupType === "pay_25_percent_monthly") {
      return "25% Monthly Plan";
    }
    return selectedTerm?.markup_type || "Installment Plan";
  };

  const installmentsToDisplay = showAllInstallments
    ? installments
    : installments.slice(0, 3);

  if (!selectedTerm) {
    return (
      <div className="flex items-center justify-center h-40">
        <p className="text-gray-500 text-[16px] font-[400] text-center">
          No term selected for payback
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 p-4">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col w-full gap-3">
          <div className="flex flex-row items-center justify-between">
            <h3 className="font-[700] text-[16px] text-black_1">
              Term Details
            </h3>
          </div>
          <HorizontalDivider color="#D2D5DA" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <span className="text-[12px] text-gray-600 font-[400]">
              Term Number
            </span>
            <span className="text-[14px] text-black_1 font-[600]">
              #{selectedTerm?.term_number}
            </span>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-[12px] text-gray-600 font-[400]">
              Customer
            </span>
            <span className="text-[14px] text-black_1 font-[600]">
              {selectedTerm?.customer_name}
            </span>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-[12px] text-gray-600 font-[400]">
              Total Amount
            </span>
            <span className="text-[14px] text-[#B87C16] font-[600]">
              GHS {parseFloat(selectedTerm?.total_order_price || 0).toFixed(2)}
            </span>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-[12px] text-gray-600 font-[400]">
              Request Date
            </span>
            <span className="text-[14px] text-black_1 font-[600]">
              {formatDate(selectedTerm?.request_date)}
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col w-full gap-3">
          <div className="flex flex-row items-center justify-between">
            <div className="flex flex-col gap-1">
              <h3 className="font-[700] text-[16px] text-black_1">
                Payment Schedule
              </h3>
              <p className="text-[12px] text-gray-600 font-[400]">
                {getInstallmentPlanType()}
              </p>
            </div>
            <p className="font-[600] text-[14px] text-black_0">
              {installments.length} installment
              {installments.length > 1 ? "s" : ""}
            </p>
          </div>
          <HorizontalDivider color="#D2D5DA" />
        </div>

        <div className="flex flex-col gap-3">
          {installmentsToDisplay?.map((installment: any, index: number) => (
            <div
              key={`installment-${index}`}
              className="flex flex-row items-center justify-between p-4 bg-gray-50 rounded-lg border"
            >
              <div className="flex flex-col gap-1">
                <p className="text-black_1 font-[600] text-[14px]">
                  Installment {installment?.installment_number || index + 1}
                </p>
                <p className="text-dark_gray text-[12px] font-[400]">
                  Due: {formatDate(installment?.due_date)}
                </p>
                <p className="text-dark_gray text-[12px] font-[400]">
                  Paid: GHS{" "}
                  {parseFloat(installment?.amount_paid || 0).toFixed(2)}
                </p>
              </div>

              <div className="flex flex-row items-center gap-3">
                {isPayNowEnabled(installment, index) &&
                  installment.status !== "paid" && (
                    <Button
                      onClick={() => handlePayNow(index)}
                      className="px-4 py-2 rounded-md text-[12px] font-[500] bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                      loading={isLoading}
                      size="sm"
                    >
                      Pay Now
                    </Button>
                  )}

                <div className="flex flex-col items-end gap-1">
                  <span className="text-[#B87C16] font-[600] text-[14px]">
                    GHS {parseFloat(installment?.amount).toFixed(2)}
                  </span>
                  <span
                    className={`text-[12px] font-[500] capitalize px-2 py-1 rounded-full ${getPaymentStatusStyle(
                      installment.status
                    )}`}
                  >
                    {installment.status === "paid"
                      ? "✓ Paid"
                      : installment.status}
                  </span>
                </div>
              </div>
            </div>
          ))}

          {installments.length > 3 && (
            <div className="w-full flex flex-row justify-center items-center">
              <button
                className="text-blue-600 font-[600] text-[14px] hover:underline"
                onClick={() => setShowAllInstallments(!showAllInstallments)}
              >
                {showAllInstallments
                  ? "Show Less"
                  : `View All (${installments.length})`}
              </button>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-3">
          <HorizontalDivider color="#D2D5DA" />
          <div className="flex flex-row items-center justify-between">
            <h3 className="font-[600] text-[14px] text-black_1">
              Total Outstanding
            </h3>
            <span className="text-[#B87C16] font-semibold text-[16px]">
              GHS{" "}
              {(() => {
                const totalAmount = parseFloat(
                  selectedTerm?.total_order_price || 0
                );
                const totalPaid = installments.reduce(
                  (sum: any, inst: any) =>
                    sum + parseFloat(inst?.amount_paid || 0),
                  0
                );
                return (totalAmount - totalPaid)?.toFixed(2);
              })()}
            </span>
          </div>
        </div>
      </div>

      {selectedTerm?.products && selectedTerm.products?.length > 0 && (
        <div className="flex flex-col gap-4">
          <div className="flex flex-col w-full gap-3">
            <div className="flex flex-row items-center justify-between">
              <h3 className="font-[700] text-[16px] text-black_1">
                Order Items
              </h3>
              <p className="font-[600] text-[14px] text-black_0">
                {selectedTerm.products.length} item
                {selectedTerm.products.length > 1 ? "s" : ""}
              </p>
            </div>
            <HorizontalDivider color="#D2D5DA" />
          </div>

          <div className="flex flex-col gap-3">
            {selectedTerm?.products?.map((product: any, index: number) => (
              <div
                key={`product-${index}`}
                className="flex flex-row items-center justify-between p-3 bg-white border rounded-lg"
              >
                <div className="flex flex-col gap-1">
                  <p className="text-black_1 font-[600] text-[14px]">
                    {product?.product_name}
                  </p>
                  <p className="text-dark_gray text-[12px] font-[400]">
                    Qty: {product?.quantity} × GHS{" "}
                    {parseFloat(product?.unit_price).toFixed(2)}
                  </p>
                </div>
                <span className="text-[#B87C16] font-[600] text-[14px]">
                  GHS {parseFloat(product?.total_price)?.toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PaybackForm;
