import React, { useState } from "react";
import { Button } from "@material-tailwind/react";
import { FormInput } from "@/components/General/form";
import { useDash } from "@/context/dashboardContext";
import FileInputComponent from "@/components/General/form/fileInputComponent";

const AddCategoryForm = ({ closeFlyout }: { closeFlyout: () => void }) => {
  const { handleCreateProductCategory, isProductCategoryCreating } = useDash();

  const [formData, setFormData] = useState({
    category_name: "",
    image: null as File | null,
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleFileChange = (file: File | null) => {
    setFormData((prev) => ({
      ...prev,
      image: file,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.category_name.trim()) {
      alert("Please enter a category name");
      return;
    }

    if (!formData.image) {
      alert("Please select an image");
      return;
    }

    const formPayload = new FormData();

    formPayload.append(
      "payload",
      JSON.stringify({
        category_name: formData.category_name,
      })
    );

    formPayload.append("image", formData.image);

    try {
      await handleCreateProductCategory(formPayload, () => {
        closeFlyout();
        setFormData({
          category_name: "",
          image: null,
        });
      });
    } catch (error) {
      console.error("Error creating category:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Category Name"
          type="text"
          placeholder="e.g Fashion"
          className="rounded-none mb-8 bg-inherit"
          name="category_name"
          value={formData.category_name}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleInputChange("category_name", e.target.value)
          }
          required
        />
        <div className="flex flex-col">
          <label htmlFor="File" className="mb-2">
            Upload file image <span color="red">*</span>
          </label>
          <FileInputComponent onFileChange={handleFileChange} />
        </div>

        <div className={"py-14 flex justify-end items-center gap-x-11"}>
          <Button
            type="button"
            className="text-pry2 bg-gray_1 normal-case"
            onClick={closeFlyout}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="bg-pry2 text-white normal-case"
            disabled={isProductCategoryCreating}
            loading={isProductCategoryCreating}
          >
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddCategoryForm;
