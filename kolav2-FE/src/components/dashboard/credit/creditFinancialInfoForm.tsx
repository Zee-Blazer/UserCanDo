"use client";

import { ChangeEvent } from "react";
import { Button, Typography } from "@material-tailwind/react";
import { CloudArrowUp } from "@phosphor-icons/react";
import { DragAndDropFileInput, FormSelect } from "@/components/General/form";
import {
  bankStatementOptions,
  getFileNameFromUrl,
  getFilePreview,
  salesRecordOptions,
  supplierStatementOptions,
} from "@/utils/helpers";

interface CreditFinancialInfoFormProps {
  isEditing?: boolean;
  handleBack: () => void;
  handleContinue: () => void;
  formData: CreateCreditFormDataProps;
  setFormData: React.Dispatch<React.SetStateAction<CreditLimitFormProps>>;
}

const CreditFinancialInfoForm = ({
  isEditing = true,
  handleBack,
  handleContinue,
  formData,
  setFormData,
}: CreditFinancialInfoFormProps) => {
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prev: CreditLimitFormProps) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFileSelect = (name: string, files: File[]) => {
    setFormData((prev: any) => ({
      ...prev,
      [name]: files?.[0] || null,
    }));
  };

  const formIsValid =
    formData?.verified_bank_statement?.trim() !== "" &&
    formData?.verified_bank_statement_file !== null &&
    formData?.supplier_distributor_statement?.trim() !== "" &&
    formData?.supplier_distributor_statement_file !== null &&
    formData?.sales_record?.trim() !== "" &&
    formData?.sales_record_file !== null;

  return (
    <main className="rounded-md py-10 mx-auto h-auto gap-8 flex flex-col">
      <header className="px-8">
        <Typography variant="h4" className="text-center font-bold">
          Financial Information
        </Typography>
        <Typography className="text-[#6F6F6F] mt-2 text-center text-sm font-normal">
          Please provide accurate financial documents for assessment.
        </Typography>
      </header>

      <div className="grid w-full px-8 grid-cols-1 gap-8">
        <FormSelect
          label="Verified Bank Statement"
          required={true}
          options={bankStatementOptions}
          placeholder="Select bank statement period"
          className="rounded-none text-gray_4"
          paddingY="3"
          bgColor="transparent"
          value={formData?.verified_bank_statement}
          name="verified_bank_statement"
          onChange={isEditing ? handleInputChange : undefined}
          readOnly={!isEditing}
        />
        <DragAndDropFileInput
          id="verified-bank-statement-file"
          onFileSelect={(files) =>
            handleFileSelect("verified_bank_statement_file", files)
          }
          value={getFilePreview(formData?.verified_bank_statement_file) || null}
          bgColor="inherit"
          borderStyle="dashed"
          borderColor="#DEDFEO"
          borderWidth="2px"
          size="sm"
          icon={<CloudArrowUp />}
          titleComponent={
            <Typography className="text-black pt-4">
              Upload Verified Bank Statement –{" "}
              <span className="text-pry2 font-medium">click or drag</span>
            </Typography>
          }
          subHeadingComponent={
            formData?.verified_bank_statement_file ? (
              <Typography className="text-sm text-black mt-2">
                {getFileNameFromUrl(formData?.verified_bank_statement_file)}
              </Typography>
            ) : (
              <Typography className="text-xs">PDF, PNG, JPG</Typography>
            )
          }
          labelDirection="vertical"
          editable={isEditing}
          centerPreview={true}
        />
        <FormSelect
          label="Supplier/Distributor Statement"
          required={true}
          options={supplierStatementOptions}
          placeholder="Select supplier statement period"
          className="rounded-none text-gray_4"
          paddingY="3"
          bgColor="transparent"
          value={formData?.supplier_distributor_statement}
          name="supplier_distributor_statement"
          onChange={isEditing ? handleInputChange : undefined}
          readOnly={!isEditing}
        />
        <DragAndDropFileInput
          id="supplier-distributor-statement-file"
          onFileSelect={(files) =>
            handleFileSelect("supplier_distributor_statement_file", files)
          }
          value={
            getFilePreview(formData?.supplier_distributor_statement_file) ||
            null
          }
          bgColor="inherit"
          borderStyle="dashed"
          borderColor="#DEDFEO"
          borderWidth="2px"
          size="sm"
          icon={<CloudArrowUp />}
          titleComponent={
            <Typography className="text-black pt-4">
              Upload Supplier/Distributor Statement –{" "}
              <span className="text-pry2 font-medium">click or drag</span>
            </Typography>
          }
          subHeadingComponent={
            formData?.supplier_distributor_statement_file ? (
              <Typography className="text-sm text-black mt-2">
                {getFileNameFromUrl(
                  formData?.supplier_distributor_statement_file
                )}
              </Typography>
            ) : (
              <Typography className="text-xs">PDF, PNG, JPG</Typography>
            )
          }
          labelDirection="vertical"
          editable={isEditing}
          centerPreview={true}
        />
        <FormSelect
          label="Sales Record"
          required={true}
          options={salesRecordOptions}
          placeholder="Select sales record period"
          className="rounded-none text-gray_4"
          paddingY="3"
          bgColor="transparent"
          value={formData?.sales_record}
          name="sales_record"
          onChange={isEditing ? handleInputChange : undefined}
          readOnly={!isEditing}
        />

        <DragAndDropFileInput
          id="sales-record-file"
          onFileSelect={(files) => handleFileSelect("sales_record_file", files)}
          value={getFilePreview(formData?.sales_record_file) || null}
          bgColor="inherit"
          borderStyle="dashed"
          borderColor="#DEDFEO"
          borderWidth="2px"
          icon={<CloudArrowUp />}
          titleComponent={
            <Typography className="text-black pt-4">
              Upload Sales Record –{" "}
              <span className="text-pry2 font-medium">click or drag</span>
            </Typography>
          }
          subHeadingComponent={
            formData?.sales_record_file ? (
              <Typography className="text-sm text-black mt-2">
                {getFileNameFromUrl(formData?.sales_record_file)}
              </Typography>
            ) : (
              <Typography className="text-xs">PDF, PNG, JPG</Typography>
            )
          }
          labelDirection="vertical"
          editable={isEditing}
          centerPreview={true}
        />
        <div className="flex justify-between gap-4 pt-2">
          <Button
            onClick={handleBack}
            className="bg-white text-pry2 normal-case font-normal text-sm px-8 py-3 rounded-lg border border-pry2 shadow-sm flex items-center gap-2"
          >
            Back
          </Button>
          <Button
            className="bg-pry2 normal-case text-white font-normal text-sm px-8 py-3 rounded-lg shadow-sm"
            onClick={handleContinue}
            // disabled={!formIsValid}
          >
            Continue
          </Button>
        </div>
      </div>
    </main>
  );
};

export default CreditFinancialInfoForm;
