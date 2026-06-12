import FlyoutLayout from "@/components/General/flyoutLayout";
import AddBusinessForm from "./addBusinessForm";

interface AddBusinessFlyoutProps {
	isRightDrawerOpen: boolean;
	closeFlyout: () => void;
}

function AddBusinessFlyout({
	isRightDrawerOpen,
	closeFlyout,
}: AddBusinessFlyoutProps) {
	return (
		<FlyoutLayout
			isRightDrawerOpen={isRightDrawerOpen}
			closeFlyout={closeFlyout}
			onSave={closeFlyout}
			showButtons={false}
			heading='Add Business'
			subheading='Complete the form below to add a new business.'
		>
			<AddBusinessForm closeFlyout={closeFlyout} />
		</FlyoutLayout>
	);
}

export default AddBusinessFlyout;
