import FlyoutLayout from "@/components/General/flyoutLayout";
import AddBusinessForm from "./addBusinessForm";

interface EditBusinessFlyoutProps {
	isEditDrawerOpen: boolean;
	closeFlyout: () => void;
	data?: BusinessListProps | null;
}

function EditBusinessFlyout({
	isEditDrawerOpen,
	closeFlyout,
	data,
}: EditBusinessFlyoutProps) {
	return (
		<FlyoutLayout
			isRightDrawerOpen={isEditDrawerOpen}
			closeFlyout={closeFlyout}
			onSave={closeFlyout}
			heading='Edit Business'
			subheading='Edit the details of this business'
			showButtons={false}
		>
			<AddBusinessForm
				isEdit
				//@ts-ignore
				initialData={data}
				closeFlyout={closeFlyout}
			/>
		</FlyoutLayout>
	);
}

export default EditBusinessFlyout;
