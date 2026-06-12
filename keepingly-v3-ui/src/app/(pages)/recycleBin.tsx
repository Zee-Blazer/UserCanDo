"use client";
import usePostRequest from "@/api/hooks/usePost";
import BinCard from "@/components/Dashboard/bin/binCard";
import BinHeader from "@/components/Dashboard/bin/binHeader";
import ConfirmRestoreModal from "@/components/Dashboard/bin/confirmRestore";
import ListCard from "@/components/Dashboard/overview/listCard";
import { DeletedItemsProps } from "@/types";
import { Recycle } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { useAppContext } from "../context";
import { useDashboardSelector } from "@/Redux/selectors";

const RecycleBin = () => {
	const { deletedItems } = useDashboardSelector();
	const { isBinFetching, getBin } = useAppContext();
	const [selectedItems, setSelectedItems] = useState<DeletedItemsProps[]>([]);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const { isSuccess, loading, postRequest, error } = usePostRequest();

	const addToList = (type: string, item?: DeletedItemsProps) => {
		if (type === "all") {
			if (selectedItems.length === deletedItems.length) {
				setSelectedItems([]);
			} else {
				setSelectedItems(deletedItems);
			}
			return;
		}

		if (item) {
			setSelectedItems((prevItems) => {
				const isItemSelected = prevItems.some(
					(selectedItem) => selectedItem.id === item.id
				);

				return isItemSelected
					? prevItems.filter((selectedItem) => selectedItem.id !== item.id)
					: [...prevItems, item];
			});
		}
	};

	const restoreItems = async (items: DeletedItemsProps[]) => {
		const payload = items.map((item) => item.id);
		postRequest("/restore", { id: payload });
	};

	useEffect(() => {
		if (isSuccess) {
			getBin();
			setIsModalOpen(false);
			setTimeout(() => {
				window.location.reload();
			}, 3000);
		}
		if (error) {
			setIsModalOpen(false);
		}
	}, [isSuccess, error]);

	return (
		<div className='p-4'>
			<BinHeader
				allItemsAction={() => {
					addToList("all");
					setIsModalOpen(true);
				}}
				selectedItemsAction={() => {
					setIsModalOpen(true);
				}}
				isDisabled={selectedItems.length < 1}
			/>
			<ListCard
				icon={<Recycle />}
				loadingState={isBinFetching}
				list={deletedItems}
				title='Recycle Bin'
				emptyStateText='No items in recycle bin'
			>
				<div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4'>
					{deletedItems?.map((item) => (
						<BinCard
							item={item}
							key={item.id}
							addToList={() => addToList("item", item)}
							restoreItem={restoreItems}
							loading={loading}
							selectedItems={selectedItems}
						/>
					))}
				</div>
			</ListCard>
			<ConfirmRestoreModal
				open={isModalOpen}
				closeModal={() => setIsModalOpen(false)}
				handleOpen={() => setIsModalOpen(!isModalOpen)}
				type={`${selectedItems.length} items`}
				action={() => restoreItems(selectedItems)}
				loading={loading}
			/>
		</div>
	);
};

export default RecycleBin;
