// import React, { useState, useMemo } from "react";
// import {
//   Dialog,
//   DialogHeader,
//   Typography,
//   IconButton,
//   DialogBody,
//   DialogFooter,
//   Button,
// } from "@material-tailwind/react";
// import { X } from "lucide-react";
// import { useDashboardSelector } from "@/Redux/selectors";
// import { useDash } from "@/context/dashboardContext";
// import { FormSelect } from "@/components/General/form";
// import { initialAddSupplier } from "@/utils/initialStates";

// interface AddSupplierModalProps {
//   open: boolean;
//   onClose: () => void;
//   onSave: () => void;
// }

// const AddSupplierModal = ({ open, onClose, onSave }: AddSupplierModalProps) => {
//   const [supplierInputs, setSupplierInputs] =
//     useState<AddSuppliersProps>(initialAddSupplier);

//   const { businesses, activeBusiness } = useDashboardSelector();
//   const { isSupplierAdding, handleAddSupplier } = useDash();

//   const supplierOptions = useMemo(() => {
//     return (
//       businesses?.filter((business) => business.id !== activeBusiness?.id) ?? []
//     );
//   }, [businesses, activeBusiness]);
//   return (
//     <Dialog open={open} handler={onClose} size="md" className="p-4">
//       <DialogHeader className="relative m-0 block">
//         <div>
//           <Typography className="text-xl font-semibold">
//             Add A Supplier
//           </Typography>
//           <Typography className="text-[#6F6F6F] font-normal text-sm pt-6 pb-6">
//             Please select a supplier you want to place your order with.
//           </Typography>
//         </div>
//         <IconButton
//           variant="text"
//           className="!absolute right-3.5 top-3.5"
//           onClick={onClose}
//         >
//           <X className="h-5 w-5 stroke-2" />
//         </IconButton>
//       </DialogHeader>

//       <DialogBody className="pt-0">
//         <form
//           onSubmit={(e) => {
//             e.preventDefault();
//             handleAddSupplier(supplierInputs, () => {
//               onClose();
//             });
//           }}
//         >
//           <div className="flex items-center justify-between gap-x-6">
//             <label className="w-1/5 text-sm font-normal text-black">
//               Supplier
//             </label>
//             <div className="w-4/5">
//               <FormSelect
//                 placeholder="Select Supplier"
//                 options={
//                   supplierOptions?.map((supplier) => supplier.business_name) ||
//                   []
//                 }
//                 value={
//                   supplierOptions?.find(
//                     (supplier) =>
//                       supplier.id === supplierInputs.supplier_entity_id
//                   )?.business_name || ""
//                 }
//                 name="supplier_entity_id"
//                 readOnly={!supplierOptions?.length}
//                 required
//                 onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
//                   const selectedSupplier = supplierOptions?.find(
//                     (supplier) => supplier.business_name === e.target.value
//                   );
//                   setSupplierInputs((prevState) => ({
//                     ...prevState,
//                     supplier_entity_id: selectedSupplier?.id || "",
//                   }));
//                 }}
//               />
//             </div>
//           </div>
//           <div className="flex items-center justify-end gap-x-4 mt-6">
//             <Button
//               type="submit"
//               disabled={!supplierInputs.supplier_entity_id || isSupplierAdding}
//               className="capitalize text-sm font-medium bg-[#003366]"
//               loading={isSupplierAdding}
//             >
//               {isSupplierAdding ? "Adding..." : "Add Supplier"}
//             </Button>
//             <Button
//               onClick={onClose}
//               variant="outlined"
//               className="capitalize text-sm font-medium border-[#D0D5DD]"
//             >
//               Close
//             </Button>
//           </div>
//         </form>
//       </DialogBody>
//     </Dialog>
//   );
// };

// export default AddSupplierModal;

import React, { useState, useMemo } from "react";
import {
  Dialog,
  DialogHeader,
  Typography,
  IconButton,
  DialogBody,
  DialogFooter,
  Button,
} from "@material-tailwind/react";
import { X } from "lucide-react";
import { useDashboardSelector } from "@/Redux/selectors";
import { useDash } from "@/context/dashboardContext";
import { FormSelect } from "@/components/General/form";
import { initialAddSupplier } from "@/utils/initialStates";

interface AddSupplierModalProps {
  open: boolean;
  onClose: () => void;
  onSave: () => void;
}

const AddSupplierModal = ({ open, onClose, onSave }: AddSupplierModalProps) => {
  const [supplierInputs, setSupplierInputs] =
    useState<AddSuppliersProps>(initialAddSupplier);

  const { platformBusiness, activeBusiness } = useDashboardSelector();
  const { isSupplierAdding, handleAddSupplier, isPlatformBusinessesLoading } =
    useDash();

  const supplierOptions = useMemo(() => {
    return (
      platformBusiness?.filter(
        (business) => business.id !== activeBusiness?.id
      ) ?? []
    );
  }, [platformBusiness, activeBusiness]);

  return (
    <Dialog open={open} handler={onClose} size="md" className="p-4">
      <DialogHeader className="relative m-0 block">
        <div>
          <Typography className="text-xl font-semibold">
            Add A Supplier
          </Typography>
          <Typography className="text-[#6F6F6F] font-normal text-sm pt-6 pb-6">
            Please select a supplier you want to place your order with.
          </Typography>
        </div>
        <IconButton
          variant="text"
          className="!absolute right-3.5 top-3.5"
          onClick={onClose}
        >
          <X className="h-5 w-5 stroke-2" />
        </IconButton>
      </DialogHeader>

      <DialogBody className="pt-0">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleAddSupplier(supplierInputs, () => {
              onClose();
            });
          }}
        >
          <div className="flex items-center justify-between gap-x-6">
            <label className="w-1/5 text-sm font-normal text-black">
              Supplier
            </label>
            <div className="w-4/5">
              <FormSelect
                placeholder={
                  isPlatformBusinessesLoading ? "Loading..." : "Select Supplier"
                }
                options={
                  supplierOptions?.map((supplier) => supplier.business_name) ||
                  []
                }
                value={
                  supplierOptions?.find(
                    (supplier) =>
                      supplier.id === supplierInputs.supplier_entity_id
                  )?.business_name || ""
                }
                name="supplier_entity_id"
                readOnly={
                  !supplierOptions?.length || isPlatformBusinessesLoading
                }
                required
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                  const selectedSupplier = supplierOptions?.find(
                    (supplier) => supplier.business_name === e.target.value
                  );
                  setSupplierInputs((prevState) => ({
                    ...prevState,
                    supplier_entity_id: selectedSupplier?.id || "",
                  }));
                }}
              />
            </div>
          </div>
          <div className="flex items-center justify-end gap-x-4 mt-6">
            <Button
              type="submit"
              disabled={
                !supplierInputs.supplier_entity_id ||
                isSupplierAdding ||
                isPlatformBusinessesLoading
              }
              className="capitalize text-sm font-medium bg-[#003366]"
              loading={isSupplierAdding}
            >
              {isSupplierAdding ? "Adding..." : "Add Supplier"}
            </Button>
            <Button
              onClick={onClose}
              variant="outlined"
              className="capitalize text-sm font-medium border-[#D0D5DD]"
            >
              Close
            </Button>
          </div>
        </form>
      </DialogBody>
    </Dialog>
  );
};

export default AddSupplierModal;
