import React, { useState } from "react";
import ListCard from "../overview/listCard";
import { FileDoc, Recycle } from "@phosphor-icons/react";
import { useDashboardSelector } from "@/Redux/selectors";
import BinCard from "../bin/binCard";
import { useAppContext } from "@/app/context";
import { DeletedItemsProps, DocProps } from "@/types";
import usePostRequest from "@/api/hooks/usePost";
import AppraiserDocCard from "./appraiserDocCard";
import { Button } from "@material-tailwind/react";
import SendToAppraiserModal from "./sendToAppraiserModal";

const AppraiserDocumentsList = () => {
	const { appraiserDocs } = useDashboardSelector();
	const { isAppraiserDocsFetching } = useAppContext();
	const [selectedItems, setSelectedItems] = useState<DocProps[]>([]);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const { isSuccess, loading, postRequest, error } = usePostRequest();

	const addToList = (item?: DocProps) => {
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

	return (
		<div>
			<ListCard
				icon={<FileDoc />}
				loadingState={isAppraiserDocsFetching}
				list={appraiserDocs}
				title='Documents'
				emptyStateText='No items in recycle bin'
				// headerRight={
				// 	<Button
				// 		disabled={selectedItems?.length < 1}
				// 		className='bg-pry normal-case'
				// 		onClick={() => setIsModalOpen(true)}
				// 	>
				// 		Send Document(s)
				// 	</Button>
				// }
			>
				<div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4'>
					{appraiserDocs?.map((item) => (
						<AppraiserDocCard
							item={item}
							key={item.id}
							addToList={() => addToList(item)}
							docType='document'
							callBack={() => {}}
							selectedItems={selectedItems}
						/>
					))}
				</div>
			</ListCard>
			<SendToAppraiserModal
				open={isModalOpen}
				closeModal={() => setIsModalOpen(false)}
				handleOpen={() => setIsModalOpen(!isModalOpen)}
				docs={selectedItems}
				action={() => {}}
				type='many'
			/>
		</div>
	);
};

export default AppraiserDocumentsList;
