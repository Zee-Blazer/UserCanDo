import { FileDoc } from "@phosphor-icons/react";
import React from "react";
import ListCard from "./listCard";
import DocCard from "../propertyDetails/docCard";
import { useDashboardSelector } from "@/Redux/selectors";
import { useAppContext } from "@/app/context";

const DocumentsCard = () => {
	const limit = 8;
	const { documents } = useDashboardSelector();
	const { isDocumentFetching, getDocuments } = useAppContext();
	return (
		<ListCard
			title='Docs, Photos & Videos'
			icon={<FileDoc size={20} />}
			list={documents}
			emptyStateText='No document yet'
			loadingState={isDocumentFetching}
		>
			<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4'>
				{documents?.slice(0, limit).map((item, index) => (
					<DocCard
						docType='photo/video'
						item={item}
						key={index}
						callBack={getDocuments}
					/>
				))}
			</div>
		</ListCard>
	);
};

export default DocumentsCard;
