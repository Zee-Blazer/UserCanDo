import FlyoutLayout from "@/components/General/flyoutLayout";
import EditInventoryForm from "./editInventoryForm";
import { Button } from "@material-tailwind/react";
import { Pen } from "lucide-react";
import { useState } from "react";

interface EditInventoryFlyoutProps {
	isEditRightDrawerOpen: boolean;
	closeFlyout: () => void;
	data: Product | null;
}

function EditInventoryFlyout({
	isEditRightDrawerOpen,
	closeFlyout,
	data,
}: EditInventoryFlyoutProps) {
	const [isEdit, setIsEdit] = useState(false);
	return (
		<FlyoutLayout
			isRightDrawerOpen={isEditRightDrawerOpen}
			closeFlyout={closeFlyout}
			onSave={closeFlyout}
			heading='Product Details'
			subheading='Add the details of the product.'
			primaryBtnText='Save Chages'
			showButtons={false}
			headingRightComponent={
				<div>
					<Button
						className={`inline-flex items-center justify-center whitespace-nowrap normal-case gap-2  font-normal shadow-none hover:shadow-none py-3 px-5 ${
							!isEdit
								? "bg-pry2 text-white"
								: "bg-transparent text-pry2 border-[1px]"
						}`}
						onClick={() => setIsEdit(!isEdit)}
					>
						<Pen
							color={isEdit ? "#003366" : "#fafafa"}
							strokeWidth={1.5}
							size={18}
						/>
						<span className='truncate'>
							{isEdit ? "Cancel Editing" : " Edit Product"}
						</span>
					</Button>
				</div>
			}
		>
			<EditInventoryForm
				closeFlyout={closeFlyout}
				initData={data!}
				isEdit={isEdit}
			/>
		</FlyoutLayout>
	);
}

export default EditInventoryFlyout;
