import { Button, Typography } from "@material-tailwind/react";
import React, { useState, useEffect } from "react";
import ApplyForCreditModal from "../credit/modals/applyForCreditModal";
import { initialCreditLimitForm } from "@/utils/initialStates";
import { CreditLimitAssessment } from "@/components/dashboard/credit/modals/creditLimitAssessment";
import { useDash } from "@/context/dashboardContext";
import { useDashboardSelector } from "@/Redux/selectors";
import ProgressBar from "@/components/General/progressBar";
import CreditPageHeader from "./creditPageHeader";
import PersonalFinancialInfo from "./personalFinancialInfo";
import CreditAssessment from "./creditAssessment";

const Credit = () => {
  const [isApplyCreditModalOpen, setIsApplyCreditModalOpen] = useState(false);
  const [isCreditLimitAssessmentOpen, setIsCreditLimitAssessmentOpen] =
    useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(initialCreditLimitForm);
  const { creditScore, creditApplications } = useDashboardSelector();
  const {
    loadCreditData,
    handleCreateCreditApplication,
    handleUpdateCreditApplication,
  } = useDash();
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  const percentage = creditScore?.percentage
    ? parseFloat(creditScore.percentage)
    : 0;

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

  const handleEditToggle = () => {
    if (isEditing) {
      handleUpdateCreditApplication(
        formData,
        formData.sales_record_file,
        formData.supplier_distributor_statement_file,
        formData.verified_bank_statement_file,
        formData.identification_file,
        () => {
          setIsEditing(false);
        }
      );
    } else {
      setIsEditing(true);
    }
  };

  return (
    <main className="min-h-screen">
      <div>
        {creditApplications && creditApplications.length > 0 ? (
          <section className="px-12 py-5">
            <section className="flex py-5 justify-between">
              <div className="flex w-full flex-col gap-3">
                <Typography className="text-gray_7 font-normal">
                  Credit Score
                </Typography>
                <Typography className="font-semibold text-[#027A48] text-3xl">
                  {creditScore?.score}
                </Typography>
              </div>
              <div className="w-full flex justify-center">
                <div className="h-full border-r border-gray_2"></div>
              </div>
              <div className="flex flex-col w-full gap-3">
                <Typography className="text-gray_7 font-normal">
                  Credit Amount(GHS)
                </Typography>
                <Typography className="font-semibold text-3xl">0</Typography>
              </div>
              <div className="w-full flex justify-center">
                <div className="h-full border-r border-gray_2"></div>
              </div>
              <div className="flex w-full flex-col gap-3">
                <Typography className="text-gray_7 font-normal">
                  Timeline
                </Typography>
                <div className="flex w-2xl flex-col">
                  <Typography className="text-gray_7 italic text-sm font-normal text-right">
                    20 Days left
                  </Typography>
                  <ProgressBar percentage={percentage} />
                </div>
              </div>
            </section>
            <div className="flex my-3 justify-between items-center">
              <Typography className="text-xl font-semibold">
                Credit Information
              </Typography>
              {/* <Button
                type="button"
                className="bg-[#F8FAFB] text-pry2 normal-case font-normal text-sm px-4 py-3 rounded-lg border border-[#D0D5DD66] shadow-sm flex items-center gap-2"
                onClick={handleEditToggle}
                disabled={isCreditApplicationUpdating}
                loading={isCreditApplicationUpdating}
              >
                {isEditing ? "Done" : "Edit"}
              </Button> */}
            </div>
            <CreditPageHeader
              activeIndex={activeTabIndex}
              setActiveIndex={setActiveTabIndex}
            />
            <div className="py-10">
              {activeTabIndex === 0 && (
                <PersonalFinancialInfo
                  isEditing={isEditing}
                  formData={formData}
                  setFormData={setFormData}
                />
              )}
              {activeTabIndex === 1 && (
                <CreditAssessment
                  isEditing={isEditing}
                  formData={formData}
                  setFormData={setFormData}
                />
              )}
            </div>
          </section>
        ) : (
          <>
            <Typography className="text-center text-gray_4 p-20 font-normal text-xl">
              You have no credit record!
            </Typography>
            <div className="flex justify-center mt-10">
              <Button
                className="bg-pry2 flex justify-center normal-case w-[550px]"
                onClick={() => setIsApplyCreditModalOpen(true)}
              >
                <Typography className="font-normal">
                  Apply for credit
                </Typography>
              </Button>
            </div>
          </>
        )}
        <ApplyForCreditModal
          isOpen={isApplyCreditModalOpen}
          onClose={() => setIsApplyCreditModalOpen(false)}
          onApply={() => {
            setIsApplyCreditModalOpen(false);
            setIsCreditLimitAssessmentOpen(true);
          }}
          formData={formData}
          setFormData={setFormData}
        />
        <CreditLimitAssessment
          isEditing={isEditing}
          open={isCreditLimitAssessmentOpen}
          onClose={() => setIsCreditLimitAssessmentOpen(false)}
          onApply={() => {
            handleCreateCreditApplication(
              formData,
              formData.sales_record_file,
              formData.supplier_distributor_statement_file,
              formData.verified_bank_statement_file,
              formData.identification_file,
              () => {
                setFormData(initialCreditLimitForm);
                setIsCreditLimitAssessmentOpen(false);
                setIsApplyCreditModalOpen(false);
              }
            );
          }}
          onBack={() => {
            setIsCreditLimitAssessmentOpen(false);
            setIsApplyCreditModalOpen(true);
          }}
          formData={formData}
          setFormData={setFormData}
        />
      </div>
    </main>
  );
};

export default Credit;
