import CurrencyInput from "@/components/General/currencyInput";
import {
  DragAndDropFileInput,
  FormInput,
  FormSelect,
} from "@/components/General/form";
import { useDash } from "@/context/dashboardContext";
import { useDashboardSelector } from "@/Redux/selectors";
import { Button, Checkbox, Typography } from "@material-tailwind/react";
import { CloudArrowUp } from "@phosphor-icons/react";
import React, { ChangeEvent, useEffect, useState } from "react";

interface EditInventoryForm {
  closeFlyout: () => void;
  initData: Product;
  isEdit: boolean;
}
const EditInventoryForm = ({
  closeFlyout,
  initData,
  isEdit,
}: EditInventoryForm) => {
  const { handleUpdateProduct, isProductUpdating } = useDash();
  const { brands, productCategories, packagesTypes, volumeTypes, weightTypes } =
    useDashboardSelector();
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileSelect = (files: File[], id: string) => {
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

  const [productDetails, setProductDetails] = useState<Product>(initData);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    setProductDetails(initData);

    //@ts-ignore
    const img = initData?.product_image;
    if (img) {
      setPreviewUrl(img);
    } else {
      setPreviewUrl(null);
    }
  }, [initData]);

  return (
    <div className="mt-4 grid gap-6">
      <FormInput
        label="Name"
        type="text"
        placeholder="e.g coffee"
        className="rounded-none bg-inherit"
        value={productDetails?.product_name}
        name="product_name"
        onChange={handleInputChange}
        readOnly={!isEdit}
      />
      <FormInput
        label="SKU"
        type="text"
        placeholder="e.g JASS-12312323"
        className="rounded-none text-gray-4 bg-inherit"
        value={productDetails?.product_sku}
        name="product_sku"
        onChange={handleInputChange}
        readOnly={!isEdit}
      />
      <FormInput
        label="Descripion"
        type="text"
        placeholder="A good product"
        className="rounded-none text-gray_4 bg-inherit"
        value={productDetails?.product_description}
        name="product_description"
        onChange={handleInputChange}
        readOnly={!isEdit}
      />

      <div className="grid grid-cols-2 gap-6">
        <FormSelect
          label="Package Type"
          options={packagesTypes?.map((pkg) => pkg.package_type_name) || []}
          placeholder="Select Category"
          className="w-full text-gray_4"
          fontSize="sm font-normal"
          value={productDetails?.product_package_type}
          name="product_package_type"
          onChange={handleInputChange}
          readOnly={!isEdit}
        />
        <FormInput
          label="Quantity per package"
          // options={["Racy Ventures"]}
          placeholder="Select Product"
          className="w-full text-gray_4"
          fontSize="sm font-normal"
          value={productDetails?.product_quantity_per_package}
          name="product_quantity_per_package"
          onChange={handleInputChange}
          readOnly={!isEdit}
        />
      </div>

      <div className="grid grid-cols-2 gap-6">
        <FormSelect
          label="Category"
          options={productCategories?.map((cat) => cat.category_name)}
          placeholder="Select Category"
          className="w-full text-gray_4"
          fontSize="sm font-normal"
          value={productDetails?.product_category_name}
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
          readOnly={!isEdit}
        />
        <FormSelect
          label="Brand"
          options={brands?.map((brand) => brand.brand_name) || []}
          placeholder="Select Product"
          className="w-full text-gray_4"
          fontSize="sm font-normal"
          value={productDetails?.product_brand_name}
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
          readOnly={!isEdit}
        />
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="text-sm text-[#101828] mb-2 block">
            Wholesale Price
          </label>
          <CurrencyInput
            inputClassName="w-[2em]"
            disabled={!isEdit}
            onChange={(value) => {
              const numericValue = parseFloat(value) || 0;
              setProductDetails({
                ...productDetails,
                product_wholesale_price: numericValue,
              });
            }}
            value={productDetails?.product_wholesale_price}
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
            value={productDetails?.product_retail_price}
            disabled={!isEdit}
          />
        </div>
      </div>

      <div>
        <div className="flex items-center">
          <Checkbox crossOrigin="" />
          <label className="text-sm text-[#101828] block">
            Sale Discount price
          </label>
        </div>
        <CurrencyInput
          inputClassName="max-w-[38%]"
          onChange={(value) => {
            const numericValue = parseFloat(value) || 0;
            setProductDetails({
              ...productDetails,
              product_sale_discount_price: numericValue,
            });
          }}
          value={productDetails?.product_sale_discount_price}
          disabled={!isEdit}
        />
      </div>
      <div className="grid grid-cols-2 gap-6">
        <FormInput
          label="Minimum order quantity"
          placeholder="A good product"
          className="rounded-none text-gray_4 bg-inherit"
          value={productDetails?.product_minimum_quantity}
          name="product_minimum_quantity"
          onChange={handleInputChange}
          readOnly={!isEdit}
        />
        <div>
          <label className="text-sm text-[#101828] block mb-3">
            Product Price Per Piece
          </label>
          <CurrencyInput
            placeholder="0"
            value={productDetails?.product_price_per_piece}
            onChange={(value) => {
              const numericValue = parseFloat(value) || 0;
              setProductDetails({
                ...productDetails,
                product_price_per_piece: numericValue,
              });
            }}
            disabled={!isEdit}
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
              value={productDetails?.product_weight}
              name="product_weight"
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                const numericValue = parseFloat(e.target.value) || 0;
                setProductDetails({
                  ...productDetails,
                  product_weight: numericValue.toString(),
                });
              }}
              readOnly={!isEdit}
            />
            <FormSelect
              options={weightTypes?.map((wg) => wg.label) || []}
              placeholder="Select"
              className="rounded-none text-sm w-full text-gray_4"
              paddingY="3"
              fontSize="sm font-normal"
              value={productDetails?.product_weight_type}
              name="product_weight_type"
              onChange={handleInputChange}
              readOnly={!isEdit}
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
              value={productDetails?.product_volume}
              name="product_volume"
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                const numericValue = parseInt(e.target.value, 10) || 0;
                setProductDetails({
                  ...productDetails,
                  product_volume: numericValue.toString(),
                });
              }}
              readOnly={!isEdit}
            />
            <FormSelect
              options={volumeTypes?.map((vol) => vol.label) || []}
              placeholder="Select"
              className="rounded-none w-full text-sm text-gray_4"
              paddingY="3"
              fontSize="sm font-normal"
              value={productDetails?.product_volume_type}
              name="product_volume_type"
              onChange={handleInputChange}
              readOnly={!isEdit}
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
          value={productDetails?.product_expiration_date}
          name="product_expiration_date"
          onChange={handleInputChange}
          readOnly={!isEdit}
        />
        <FormInput
          label="Stock Level"
          type="text"
          placeholder="0"
          className="rounded-none bg-inherit"
          value={productDetails?.product_stock_level}
          name="product_stock_level"
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            const numericValue = parseInt(e.target.value, 10) || 0;
            setProductDetails({
              ...productDetails,
              product_stock_level: numericValue,
            });
          }}
          readOnly={!isEdit}
        />
      </div>
      <div className="space-y-3">
        <Typography variant="small" className="font-medium">
          Upload product image
        </Typography>
        <DragAndDropFileInput
          onFileSelect={handleFileSelect}
          id="logo-edit"
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
        {isEdit && (
          <Button
            className="bg-pry2 text-white normal-case"
            loading={isProductUpdating}
            disabled={isProductUpdating}
            onClick={() =>
              handleUpdateProduct(productDetails, file!, () => {
                closeFlyout();
              })
            }
          >
            Save Changes
          </Button>
        )}
      </div>
    </div>
  );
};

export default EditInventoryForm;
