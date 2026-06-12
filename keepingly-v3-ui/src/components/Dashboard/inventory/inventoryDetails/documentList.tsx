import { Typography } from "@material-tailwind/react";
import React from "react";
import { DocProps } from "@/types";
import DocCard from "../../propertyDetails/docCard";

const DocumentList = ({
	documents,
	callBack,
}: {
	documents: DocProps[];
	callBack: () => void;
}) => {
	return (
		<div className='mt-4'>
			<Typography className='text-black font-semibold dark:text-white mb-2'>
				Documents
			</Typography>
			<div className='flex flex-col gap-4'>
				{documents.map((doc, index) => {
					return (
						<DocCard
							view='list'
							key={doc?.id}
							docType='document'
							item={doc}
							callBack={callBack}
						/>
					);
				})}
			</div>
		</div>
	);
};

export default DocumentList;
