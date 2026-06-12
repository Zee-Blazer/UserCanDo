import {
  DragAndDropFileInput,
  FormInput,
  FormSelect,
} from "@/components/General/form";
import { Typography } from "@material-tailwind/react";
import { CloudArrowUp } from "@phosphor-icons/react";
import React, { ChangeEvent } from "react";
import { getFileNameFromUrl, getFilePreview } from "@/utils/helpers";

interface PersonalFinancialInfoProps {
  isEditing: boolean;
  formData: any;
  setFormData: (data: any) => void;
}

const PersonalFinancialInfo: React.FC<PersonalFinancialInfoProps> = ({
  isEditing,
  formData,
  setFormData,
}) => {
  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileSelect = (name: string, files: File[]) => {
    setFormData((prev: any) => ({
      ...prev,
      [name]: files[0] || null,
    }));
  };

  return (
    <div className="max-w-4xl">
      <section>
        <Typography className="text-lg font-semibold">
          Personal Information
        </Typography>
        <div className="grid py-8 space-y-5 grid-cols-1">
          <FormInput
            label="Full Name"
            required
            name="full_name"
            value={formData.full_name || ""}
            onChange={isEditing ? handleInputChange : undefined}
            className="bg-white rounded-none"
            readOnly={!isEditing}
          />
          <div className="flex w-full items-center gap-3">
            <div className="flex-1">
              <FormInput
                label="Phone Number"
                required
                name="phone_number"
                value={formData.phone_number || ""}
                onChange={isEditing ? handleInputChange : undefined}
                className="bg-white rounded-none flex-1"
                readOnly={!isEditing}
              />
            </div>
            <div className="flex-1">
              <FormInput
                label="Email"
                required
                name="email"
                value={formData.email || ""}
                onChange={isEditing ? handleInputChange : undefined}
                className="bg-white rounded-none flex-1"
                readOnly={!isEditing}
              />
            </div>
          </div>
          <div className="flex flex-col gap-y-4">
            <FormSelect
              label="Identification"
              required={true}
              placeholder="Select means of identification"
              className="rounded-none text-gray_4"
              paddingY="3"
              bgColor="transparent"
              options={["Id Card", "Driver's License", "Voter's card"]}
              name="means_of_identification"
              value={formData.means_of_identification || ""}
              onChange={isEditing ? handleInputChange : undefined}
              readOnly={!isEditing}
            />
            <DragAndDropFileInput
              id="identification-file"
              onFileSelect={(files) =>
                handleFileSelect("identification_file", files)
              }
              value={getFilePreview(formData.identification_file) || null}
              bgColor="inherit"
              borderStyle="dashed"
              borderColor="#DEDFEO"
              borderWidth="2px"
              size="sm"
              icon={<CloudArrowUp />}
              titleComponent={
                <Typography className="text-black pt-4">
                  Drag your file here, or{" "}
                  <span className="text-pry2 font-medium">click to upload</span>
                </Typography>
              }
              subHeadingComponent={
                formData.identification_file ? (
                  <Typography className="text-sm text-black mt-2">
                    {getFileNameFromUrl(formData.identification_file)}
                  </Typography>
                ) : (
                  <Typography className="text-xs">PNG, JPG</Typography>
                )
              }
              labelDirection="vertical"
              editable={isEditing}
              centerPreview={true}
            />
          </div>
          <div className="flex w-full items-center gap-3">
            <div className="flex-1">
              <FormInput
                label="Next of kin's full name"
                required
                name="next_of_kin_name"
                value={formData.next_of_kin_name || ""}
                onChange={isEditing ? handleInputChange : undefined}
                className="bg-white rounded-none flex-1"
                readOnly={!isEditing}
              />
            </div>
            <div className="flex-1">
              <FormInput
                label="Next of kin's phone number"
                required
                name="next_of_kin_phone_number"
                value={formData.next_of_kin_phone_number || ""}
                onChange={isEditing ? handleInputChange : undefined}
                className="bg-white rounded-none flex-1"
                readOnly={!isEditing}
              />
            </div>
          </div>
          <FormInput
            label="Residential address"
            required
            name="address"
            value={formData.address || ""}
            onChange={isEditing ? handleInputChange : undefined}
            className="bg-white rounded-none"
            readOnly={!isEditing}
          />
          <FormInput
            label="Registered business address"
            required
            name="registered_business_address"
            value={formData.registered_business_address || ""}
            onChange={isEditing ? handleInputChange : undefined}
            className="bg-white rounded-none"
            readOnly={!isEditing}
          />
          <FormInput
            label="Date of birth"
            required
            name="date_of_birth"
            type="date"
            value={formData.date_of_birth || ""}
            onChange={isEditing ? handleInputChange : undefined}
            className="bg-white rounded-none"
            readOnly={!isEditing}
          />
        </div>
      </section>

      <section>
        <Typography className="text-lg font-semibold">
          Financial Information
        </Typography>
        <div className="grid py-8 space-y-5 grid-cols-1">
          <FormInput
            label="Verified Bank Statement *"
            placeholder="Enter any notes about the file"
            required
            name="verified_bank_statement"
            value={formData.verified_bank_statement || ""}
            onChange={isEditing ? handleInputChange : undefined}
            bgColor="transparent"
            paddingY="3"
            readOnly={!isEditing}
          />
          <DragAndDropFileInput
            id="verified-bank-statement-file"
            onFileSelect={(files) =>
              handleFileSelect("verified_bank_statement_file", files)
            }
            value={
              getFilePreview(formData.verified_bank_statement_file) || null
            }
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
              formData.verified_bank_statement_file ? (
                <Typography className="text-sm text-black mt-2">
                  {getFileNameFromUrl(formData.verified_bank_statement_file)}
                </Typography>
              ) : (
                <Typography className="text-xs">PDF, PNG, JPG</Typography>
              )
            }
            labelDirection="vertical"
            editable={isEditing}
            centerPreview={true}
          />

          <FormInput
            label="Supplier/Distributor Statement (Optional)"
            placeholder="Enter any notes about the file"
            required
            name="supplier_distributor_statement"
            value={formData.supplier_distributor_statement || ""}
            onChange={isEditing ? handleInputChange : undefined}
            bgColor="transparent"
            paddingY="3"
            readOnly={!isEditing}
          />
          <DragAndDropFileInput
            id="supplier-distributor-statement-file"
            onFileSelect={(files) =>
              handleFileSelect("supplier_distributor_statement_file", files)
            }
            value={
              getFilePreview(formData.supplier_distributor_statement_file) ||
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
              formData.supplier_distributor_statement_file ? (
                <Typography className="text-sm text-black mt-2">
                  {getFileNameFromUrl(
                    formData.supplier_distributor_statement_file
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

          <FormInput
            label="Sales Record (Optional)"
            placeholder="Enter any notes about the file"
            required
            name="sales_record"
            value={formData.sales_record || ""}
            onChange={isEditing ? handleInputChange : undefined}
            bgColor="transparent"
            paddingY="3"
            readOnly={!isEditing}
          />
          <DragAndDropFileInput
            id="sales-record-file"
            onFileSelect={(files) =>
              handleFileSelect("sales_record_file", files)
            }
            value={getFilePreview(formData.sales_record_file) || null}
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
              formData.sales_record_file ? (
                <Typography className="text-sm text-black mt-2">
                  {getFileNameFromUrl(formData.sales_record_file)}
                </Typography>
              ) : (
                <Typography className="text-xs">PDF, PNG, JPG</Typography>
              )
            }
            labelDirection="vertical"
            editable={isEditing}
            centerPreview={true}
          />
        </div>
      </section>
    </div>
  );
};

export default PersonalFinancialInfo;
