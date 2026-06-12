import React, { useEffect, useRef, useState } from "react";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  Typography,
} from "@material-tailwind/react";
import logo from "@/assets/images/logo.png";
import Image from "next/image";
import { X } from "@phosphor-icons/react";
import usePreventRefresh from "@/api/hooks/usePreventRefresh";
import PersonalInfoForm from "../../credit/personalinformationForm";
import CreditFinancialInfoForm from "../../credit/creditFinancialInfoForm";
import { useDashboardSelector } from "@/Redux/selectors";
import { initialCreditLimitForm } from "@/utils/initialStates";
import PlaceOrderForm from "../slides/placeOrder/placeOrderForm";
import { useDash } from "@/context/dashboardContext";

interface EditSupplierTermData {
  id: string;
  term_number: string;
  customer_name: string;
  customer_entity_id: string;
  customer_entity_type: string;
  markup_type: string;
  markup_percentage: string;
  markup_duration_week: number;
  markup_penalty_percentage: string;
  total_order_price: string;
  products: any[];
  invoices: any[];
}

interface PlaceOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  isRenewal?: boolean;
  onApply?: () => void;
  editData?: EditSupplierTermData | null;
  isEdit?: boolean;
}

export function PlaceOrderModal({
  isOpen,
  onClose,
  isRenewal = false,
  onApply,
  editData,
  isEdit,
}: PlaceOrderModalProps) {
  const [activeSlideIndex, setActiveSlideIndex] = useState(isRenewal ? 2 : 0);
  usePreventRefresh(true);

  const dialogBodyRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState(initialCreditLimitForm);

  const { loadCreditData } = useDash();
  const { creditApplications } = useDashboardSelector();

  useEffect(() => {
    loadCreditData();
  }, [loadCreditData]);

  useEffect(() => {
    if (creditApplications && creditApplications.length > 0) {
      const app: any = creditApplications[0];
      setFormData({
        ...initialCreditLimitForm,
        id: app.id || "",
        full_name: app.full_name || "",
        email: app.email || "",
        phone_number: app.phone_number || "",
        means_of_identification: app.means_of_identification || "",
        next_of_kin_name: app.next_of_kin_name || "",
        next_of_kin_phone_number: app.next_of_kin_phone_number || "",
        address: app.address || "",
        registered_business_address: app.registered_business_address || "",
        date_of_birth: app.date_of_birth || "",
        verified_bank_statement: app.verified_bank_statement || "",
        supplier_distributor_statement:
          app.supplier_distributor_statement || "",
        sales_record: app.sales_record || "",
        identification_file: app.identification_file || "",
        verified_bank_statement_file: app.verified_bank_statement_file || "",
        supplier_distributor_statement_file:
          app.supplier_distributor_statement_file || "",
        sales_record_file: app.sales_record_file || "",
        ...app.credit_assessment,
      });
    }
  }, [creditApplications]);

  useEffect(() => {
    if (isRenewal && activeSlideIndex < 2) {
      setActiveSlideIndex(2);
    }
  }, [isRenewal, isOpen]);

  useEffect(() => {
    if (isEdit && editData) {
      setActiveSlideIndex(2);
    }
  }, [isEdit, editData]);

  useEffect(() => {
    if (dialogBodyRef.current) {
      dialogBodyRef.current.scrollTop = 0;
    }
  }, [activeSlideIndex]);

  const totalSteps = isRenewal ? 1 : 3;

  const getStepLabel = () => {
    if (isRenewal) {
      return `Step 1 of 1: Place Order`;
    }

    return `Step ${activeSlideIndex + 1} of ${totalSteps}: ${
      activeSlideIndex === 0
        ? "Personal Information"
        : activeSlideIndex === 1
        ? "Financial Information"
        : "Place Order"
    }`;
  };

  return (
    <>
      <Dialog open={isOpen} handler={onClose} size="xxl">
        <DialogHeader className="flex justify-between items-center px-20 py-6">
          <div className="flex items-center gap-x-6">
            <Image src={logo} alt="Kola logo" className="w-[116px]" />

            <div className="bg-[#DEDFE0] w-[1px] h-12" />
            <Typography>{getStepLabel()}</Typography>
          </div>
          <div
            className="flex items-center gap-x-1 cursor-pointer"
            onClick={onClose}
          >
            <Typography className="pt-1 text-sm font-bold text-[#4B525A]">
              Exit
            </Typography>
            <X />
          </div>
        </DialogHeader>

        <div className="flex items-center w-full px-4">
          {Array.from({ length: totalSteps }).map((_, index) => (
            <React.Fragment key={index}>
              <div
                className={`h-[2px] ${
                  index < activeSlideIndex ? "bg-pry2" : "bg-gray-300"
                } ${index === 0 ? "w-1/2" : "flex-1"}`}
              />
              {index < totalSteps - 1 && (
                <div
                  className={`h-[2px] ${
                    index < activeSlideIndex ? "bg-pry2" : "bg-gray-300"
                  } ${index === totalSteps - 2 ? "w-1/2" : "flex-1"}`}
                />
              )}
            </React.Fragment>
          ))}
        </div>

        <DialogBody
          ref={dialogBodyRef}
          className="bg-[#F8FAFB] pt-12 flex-1 overflow-y-auto mt-8"
        >
          <div className="lg:w-1/2 bg-white lg:mx-auto rounded-lg">
            <div className="w-full relative">
              {isRenewal ? (
                <PlaceOrderForm
                  isEditing={true}
                  formData={formData}
                  setFormData={setFormData}
                  handleBack={() => {
                    setFormData(initialCreditLimitForm);
                    onClose();
                  }}
                  onClose={() => {
                    setFormData(initialCreditLimitForm);
                    onClose();
                  }}
                  editData={editData}
                  isEdit={isEdit}
                />
              ) : (
                <div className="relative overflow-hidden">
                  <div
                    className={`transition-transform duration-500 ease-in-out ${
                      activeSlideIndex === 0
                        ? "translate-x-0 opacity-100"
                        : "-translate-x-full opacity-0 absolute inset-0"
                    }`}
                  >
                    <PersonalInfoForm
                      isEditing={false}
                      handleBack={onClose}
                      handleContinue={() => setActiveSlideIndex(1)}
                      formData={formData}
                      setFormData={setFormData}
                    />
                  </div>

                  <div
                    className={`transition-transform duration-500 ease-in-out ${
                      activeSlideIndex === 1
                        ? "translate-x-0 opacity-100"
                        : activeSlideIndex < 1
                        ? "translate-x-full opacity-0 absolute inset-0"
                        : "-translate-x-full opacity-0 absolute inset-0"
                    }`}
                  >
                    <CreditFinancialInfoForm
                      isEditing={false}
                      handleBack={() => setActiveSlideIndex(0)}
                      handleContinue={() => setActiveSlideIndex(2)}
                      formData={formData}
                      setFormData={setFormData}
                    />
                  </div>

                  <div
                    className={`transition-transform duration-500 ease-in-out ${
                      activeSlideIndex === 2
                        ? "translate-x-0 opacity-100"
                        : "translate-x-full opacity-0 absolute inset-0"
                    }`}
                  >
                    <PlaceOrderForm
                      isEditing={false}
                      formData={formData}
                      setFormData={setFormData}
                      handleBack={() => setActiveSlideIndex(1)}
                      onClose={() => {
                        setFormData(initialCreditLimitForm);
                        onClose();
                      }}
                      editData={editData}
                      isEdit={isEdit}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </DialogBody>
      </Dialog>
    </>
  );
}

export default PlaceOrderModal;
