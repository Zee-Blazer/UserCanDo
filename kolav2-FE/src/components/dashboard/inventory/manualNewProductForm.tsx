import CurrencyInput from "@/components/General/currencyInput";
import {
  DragAndDropFileInput,
  FormCheckbox,
  FormInput,
  FormSelect,
} from "@/components/General/form";
import { useDash } from "@/context/dashboardContext";
import { useDashboardSelector } from "@/Redux/selectors";
import { initialProductState } from "@/utils/initialStates";
import { Button, Typography } from "@material-tailwind/react";
import { CloudArrowUp } from "@phosphor-icons/react";
import React, { ChangeEvent, useEffect, useState } from "react";

const ManualNewProductForm = ({ closeFlyout }: { closeFlyout: () => void }) => {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const { handleCreateProduct, isProductCreating } = useDash();
  const {
    brands,
    productCategories,
    activeBusiness,
    packagesTypes,
    volumeTypes,
    weightTypes,
  } = useDashboardSelector();
  const handleFileSelect = (files: File[]) => {
    if (files.length > 0) {
      const selectedFile = files[0];
      setFile(selectedFile);
      const fileUrl = URL.createObjectURL(selectedFile);
      setPreviewUrl(fileUrl);
    } else {
      setFile(null);
      setPreviewUrl(null);
    }
  };

  useEffect(() => {
    setProductDetails({
      ...productDetails,
      business_id: activeBusiness?.id || "",
    });
  }, [activeBusiness]);

  const [productDetails, setProductDetails] =
    useState<Product>(initialProductState);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
  };

  return (
    <div className="mt-4 grid gap-6">
      <FormInput
        label="Name"
        type="text"
        placeholder="e.g coffee"
        className="rounded-none bg-inherit"
        value={productDetails.product_name}
        name="product_name"
        onChange={handleInputChange}
      />
      <FormInput
        label="SKU"
        type="text"
        placeholder="SKU will be auto-generated"
        className="rounded-none cursor-not-allowed text-gray-4 bg-inherit"
        name="product_sku"
        readOnly
      />
      <FormInput
        label="Descripion"
        type="text"
        placeholder="A good product"
        className="rounded-none text-gray_4 bg-inherit"
        value={productDetails.product_description}
        name="product_description"
        onChange={handleInputChange}
      />

      <div className="grid grid-cols-2 gap-6">
        <FormSelect
          label="Package Type"
          options={packagesTypes?.map((pkg) => pkg.package_type_name) || []}
          placeholder="Select Category"
          className="w-full text-gray_4"
          fontSize="sm font-normal"
          value={productDetails.product_package_type}
          name="product_package_type"
          onChange={handleInputChange}
        />
        <FormInput
          label="Quantity per package"
          // options={["Racy Ventures"]}
          placeholder="Select Product"
          className="w-full text-gray_4"
          fontSize="sm font-normal"
          value={productDetails.product_quantity_per_package}
          name="product_quantity_per_package"
          onChange={handleInputChange}
        />
      </div>

      <div className="grid grid-cols-2 gap-6">
        <FormSelect
          label="Category"
          options={productCategories?.map((cat) => cat.category_name)}
          placeholder="Select Category"
          className="w-full text-gray_4"
          fontSize="sm font-normal"
          value={productDetails.product_category_name}
          name="product_category_name"
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            handleInputChange(e);
            const val = e.target.value;
            const selectedCat = productCategories?.find(
              (cat) => cat.category_name === val
            );
            setProductDetails({
              ...productDetails,
              product_category_name: val,
              category_id: selectedCat?.id || "",
            });
          }}
        />
        <FormSelect
          label="Brand"
          options={brands?.map((brand) => brand.brand_name) || []}
          placeholder="Select Product"
          className="w-full text-gray_4"
          fontSize="sm font-normal"
          value={productDetails.product_brand_name}
          name="product_brand_name"
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            handleInputChange(e);
            const val = e.target.value;
            const selectedBrand = brands.find(
              (brand) => brand.brand_name === val
            );
            setProductDetails({
              ...productDetails,
              brand_id: selectedBrand?.id || "",
              product_brand_name: val,
            });
          }}
        />
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="text-sm text-[#101828] mb-2 block">
            Wholesale Price
          </label>
          <CurrencyInput
            inputClassName="w-[2em]"
            onChange={(value) => {
              const numericValue = parseFloat(value) || 0;
              setProductDetails({
                ...productDetails,
                product_wholesale_price: numericValue,
              });
            }}
            value={productDetails.product_wholesale_price}
          />
        </div>
        <div>
          <label className="text-sm text-[#101828] mb-2 block">
            Retail Price
          </label>
          <CurrencyInput
            inputClassName="w-[2em]"
            onChange={(value) => {
              const numericValue = parseFloat(value) || 0;
              setProductDetails({
                ...productDetails,
                product_retail_price: numericValue,
              });
            }}
            value={productDetails.product_retail_price}
          />
        </div>
      </div>

      <div>
        <div className="flex items-center mb-3">
          <FormCheckbox
            checked={isChecked}
            setChecked={setIsChecked}
            label="Sale Discount price"
          />
        </div>
        {isChecked && (
          <CurrencyInput
            inputClassName="max-w-[38%]"
            onChange={(value) => {
              const numericValue = parseFloat(value) || 0;
              setProductDetails({
                ...productDetails,
                product_sale_discount_price: numericValue,
              });
            }}
            value={productDetails.product_sale_discount_price}
          />
        )}
      </div>
      <div className="grid grid-cols-2 gap-6">
        <FormInput
          label="Minimum order quantity"
          placeholder="0"
          className="rounded-none text-gray_4 bg-inherit"
          value={productDetails.product_minimum_quantity}
          name="product_minimum_quantity"
          onChange={handleInputChange}
        />
        <div>
          <label className="text-sm text-[#101828] block mb-3">
            Product Price Per Piece
          </label>
          <CurrencyInput
            placeholder="0"
            value={productDetails.product_price_per_piece}
            onChange={(value) => {
              const numericValue = parseFloat(value) || 0;
              setProductDetails({
                ...productDetails,
                product_price_per_piece: numericValue,
              });
            }}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="grid gap-1">
          <label className="text-sm text-[#101828]">Weight</label>
          <div className="grid grid-cols-2 items-center gap-1">
            <FormInput
              type="text"
              placeholder="0"
              className="rounded-none text-gray_4 bg-inherit"
              value={productDetails.product_weight}
              name="product_weight"
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                const numericValue = parseFloat(e.target.value) || 0;
                setProductDetails({
                  ...productDetails,
                  product_weight: numericValue.toString(),
                });
              }}
            />
            <FormSelect
              options={weightTypes?.map((wg) => wg.label) || []}
              placeholder="Select"
              className="rounded-none text-sm w-full text-gray_4"
              paddingY="3"
              fontSize="sm font-normal"
              value={productDetails.product_weight_type}
              name="product_weight_type"
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="grid gap-1">
          <label className="text-sm text-[#101828]">Volume</label>
          <div className="grid grid-cols-2 items-center gap-1">
            <FormInput
              type="text"
              placeholder="0"
              className="rounded-none text-gray_4 bg-inherit"
              value={productDetails.product_volume}
              name="product_volume"
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                const numericValue = parseFloat(e.target.value) || 0;
                setProductDetails((prev) => ({
                  ...prev,
                  product_volume: numericValue.toString(),
                }));
              }}
            />
            <FormSelect
              options={volumeTypes?.map((vol) => vol.label) || []}
              placeholder="Select"
              className="rounded-none w-full text-sm text-gray_4"
              paddingY="3"
              fontSize="sm font-normal"
              value={productDetails.product_volume_type}
              name="product_volume_type"
              onChange={handleInputChange}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <FormInput
          label="Expiration Date"
          type="date"
          placeholder="A good product"
          className="rounded-none text-gray_4 bg-inherit"
          value={productDetails.product_expiration_date}
          name="product_expiration_date"
          onChange={handleInputChange}
        />
        <FormInput
          label="Stock Level"
          type="text"
          placeholder="0"
          className="rounded-none bg-inherit"
          value={productDetails.product_stock_level}
          name="product_stock_level"
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            const numericValue = parseInt(e.target.value, 10) || 0;
            setProductDetails((prev) => ({
              ...prev,
              product_stock_level: numericValue,
            }));
          }}
        />
      </div>
      <div className="space-y-3">
        <Typography variant="small" className="font-medium">
          Upload product image
        </Typography>
        <DragAndDropFileInput
          onFileSelect={handleFileSelect}
          id="logo"
          bgColor="#EFF3F6"
          borderColor="#F5AA29"
          borderStyle="none"
          borderWidth="2px"
          size="sm"
          icon={<CloudArrowUp className="w-6 h-6 text-gray-400" />}
          titleComponent={
            <Typography className="text-sm pt-2">
              <span className="font-semibold text-gray-700">
                Click to Upload
              </span>{" "}
              or drag and drop
            </Typography>
          }
          subHeadingComponent={
            <Typography className="text-xs text-gray-500 pb-2">
              PNG, JPG (max. 2MB)
            </Typography>
          }
          labelDirection="vertical"
        />
        {/* Add Preview Here */}
        {previewUrl && (
          <div className="mt-2 ">
            <Typography variant="small" className="text-gray-700">
              Preview
            </Typography>
            <img
              src={previewUrl}
              alt="Product preview"
              className="w-full h-40 object-cover rounded-md"
            />
          </div>
        )}
      </div>
      <div className={"py-14 flex justify-end items-center gap-x-11"}>
        <Button
          className="text-pry2 bg-gray_1 normal-case"
          onClick={closeFlyout}
        >
          Cancel
        </Button>
        <Button
          className="bg-pry2 text-white normal-case"
          loading={isProductCreating}
          disabled={isProductCreating}
          onClick={() =>
            handleCreateProduct(productDetails, file!, () => {
              closeFlyout();
            })
          }
        >
          Save Changes
        </Button>
      </div>
    </div>
  );
};

export default ManualNewProductForm;
