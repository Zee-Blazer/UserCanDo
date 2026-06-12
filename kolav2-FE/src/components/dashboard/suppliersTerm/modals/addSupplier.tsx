import React, { useState, useMemo } from "react";
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  Typography,
  IconButton,
  DialogHeader,
  Radio,
} from "@material-tailwind/react";
import { FormSelect } from "@/components/General/form";
import { X } from "lucide-react";
import { useDashboardSelector } from "@/Redux/selectors";
import { useDash } from "@/context/dashboardContext";
import { initialAddSupplier } from "@/utils/initialStates";

interface AddSupplierModalProps {
  open: boolean;
  onClose: () => void;
}

const AddSupplier = ({ open, onClose }: AddSupplierModalProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOption, setSelectedOption] = useState("selectBusiness");
  const [supplierInputs, setSupplierInputs] =
    useState<AddSuppliersProps>(initialAddSupplier);

  const { businesses, activeBusiness } = useDashboardSelector();
  const { isSupplierAdding, handleAddSupplier } = useDash();

  // Filter out current business from supplier options and apply search filter
  const supplierOptions = useMemo(() => {
    const filteredBusinesses =
      businesses?.filter((business) => business.id !== activeBusiness?.id) ||
      [];

    if (!searchTerm) return filteredBusinesses;

    return filteredBusinesses.filter((business) =>
      business.business_name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [businesses, activeBusiness, searchTerm]);

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(e.target.value);
    setSupplierInputs(initialAddSupplier);
  };

  const handleSupplierSelect = (businessName: string) => {
    const selectedSupplier = supplierOptions?.find(
      (supplier) => supplier.business_name === businessName
    );
    setSupplierInputs((prevState) => ({
      ...prevState,
      supplier_entity_id: selectedSupplier?.id || "",
    }));
  };

  const handleAddSelectedSupplier = () => {
    if (supplierInputs.supplier_entity_id) {
      handleAddSupplier(supplierInputs, () => {
        onClose();
        setSupplierInputs(initialAddSupplier);
        setSearchTerm("");
      });
    }
  };

  return (
    <Dialog
      open={open}
      size="lg"
      handler={onClose}
      className="p-6"
      dismiss={{
        escapeKey: true,
        outsidePress: false,
      }}
    >
      <div className="max-h-[80vh] overflow-y-auto">
        <DialogHeader className="flex items-center justify-between mb-4 sticky top-0 bg-white z-10">
          <div className="flex items-center gap-3">
            <IconButton variant="text" onClick={onClose}>
              <X className="h-6 w-6 stroke-2" />
            </IconButton>
            <div>
              <Typography className="text-xl text-black font-semibold">
                Add New Supplier
              </Typography>
              <Typography className="text-gray-500 text-sm">
                {selectedOption === "selectBusiness"
                  ? "Select an existing business to add as supplier"
                  : "Create a new business and add as supplier"}
              </Typography>
            </div>
          </div>
        </DialogHeader>

        <div className="flex-1 mt-4">
          <DialogBody className="space-y-3">
            <div className="flex gap-6 mb-6">
              <Radio
                crossOrigin=""
                name="type"
                label="Select A Business"
                value="selectBusiness"
                defaultChecked
                onChange={handleRadioChange}
                checked={selectedOption === "selectBusiness"}
              />
            </div>

            <div className="mt-6">
              {selectedOption === "selectBusiness" && (
                <>
                  {/* Supplier selection dropdown */}
                  <div className="mt-4">
                    <FormSelect
                      placeholder={
                        supplierOptions.length === 0
                          ? "No businesses available"
                          : "Select a business to add as supplier"
                      }
                      options={
                        supplierOptions?.map(
                          (supplier) => supplier.business_name
                        ) || []
                      }
                      value={
                        supplierOptions?.find(
                          (supplier) =>
                            supplier.id === supplierInputs.supplier_entity_id
                        )?.business_name || ""
                      }
                      name="supplier_entity_id"
                      readOnly={!supplierOptions?.length}
                      required
                      onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                        handleSupplierSelect(e.target.value);
                      }}
                    />
                  </div>

                  {/* Selected supplier display */}
                  {supplierInputs.supplier_entity_id && (
                    <div className="mt-4 flex items-center gap-2">
                      <Button
                        variant="text"
                        className="px-3 py-3 border-[1px] shadow-none hover:shadow-none rounded-lg text-sm flex items-center gap-2 bg-inherit border-gray-300 text-gray-700"
                      >
                        <Typography className="text-sm font-normal text-black">
                          {
                            supplierOptions?.find(
                              (supplier) =>
                                supplier.id ===
                                supplierInputs.supplier_entity_id
                            )?.business_name
                          }
                        </Typography>
                        <X
                          size={16}
                          className="cursor-pointer"
                          onClick={() => setSupplierInputs(initialAddSupplier)}
                        />
                      </Button>
                    </div>
                  )}

                  {/* Show message if no businesses available */}
                  {supplierOptions.length === 0 && !searchTerm && (
                    <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                      <Typography className="text-sm text-gray-600 text-center">
                        No businesses available to add as suppliers.
                      </Typography>
                    </div>
                  )}

                  {/* Show no results message for search */}
                  {supplierOptions.length === 0 && searchTerm && (
                    <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                      <Typography className="text-sm text-gray-600 text-center">
                        No businesses found matching "{searchTerm}"
                      </Typography>
                    </div>
                  )}
                </>
              )}
            </div>
          </DialogBody>

          {/* Footer for select business mode only */}
          {selectedOption === "selectBusiness" && (
            <DialogFooter className="gap-5 mt-8 p-0 sticky bottom-0 bg-white py-2">
              <Button
                variant="outlined"
                onClick={onClose}
                className="normal-case"
              >
                <Typography className="text-sm">Cancel</Typography>
              </Button>
              <Button
                className="normal-case bg-pry2 text-white"
                onClick={handleAddSelectedSupplier}
                disabled={
                  !supplierInputs.supplier_entity_id || isSupplierAdding
                }
                loading={isSupplierAdding}
              >
                <Typography className="text-sm">
                  {isSupplierAdding ? "Adding..." : "Add Supplier"}
                </Typography>
              </Button>
            </DialogFooter>
          )}
        </div>
      </div>
    </Dialog>
  );
};

export default AddSupplier;
