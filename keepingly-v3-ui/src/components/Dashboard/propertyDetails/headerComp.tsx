import IconContainer from "@/components/General/iconContainer";
import { Button, Typography } from "@material-tailwind/react";
import { ArrowLeft, Trash } from "@phosphor-icons/react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import SharePropertyModal from "./sharePropertyModal";
import usePostRequest from "@/api/hooks/usePost";
import { useAuthSelector, useDashboardSelector } from "@/Redux/selectors";
import { useAppContext } from "@/app/context";
import AssignPropertyModal from "./assignPropertyModal";
import { AgentItemProps } from "@/types";
import useApiRequest from "@/api/hooks/useApiRequest";
import { Home, House } from "lucide-react";
import { PropertyIcon } from "@/assets/icons";

interface PropertyDetailsHeaderProps {
	address: string;
	isEdit: boolean;
	setIsEdit: (value: boolean) => void;
	editProperty: () => void;
	handledDelete: () => void;
	loadingState: boolean;
	propId: string;
	email: string;
}

const PropertyDetailsHeader = ({
	address,
	isEdit,
	setIsEdit,
	editProperty,
	loadingState,
	propId,
	email,
	handledDelete,
}: PropertyDetailsHeaderProps) => {
	const { isSuccess, loading, postRequest } = usePostRequest();
	const [isModalShown, setIsModalShown] = useState(false);
	const [isAssignModalShown, setIsAssignModalShown] = useState(false);
	const { user } = useAuthSelector();
	const { loadOverView } = useAppContext();
	const [assignedAgent, setAssignedAgent] = useState("");
	const { agents } = useDashboardSelector();
	const { postRequest: assign, loading: isAssigning } = useApiRequest();

	const allAgents =
		agents
			?.filter((ag) => !ag.is_suspended)
			?.map((agent) => {
				const ag = `${agent?.first_name} ${agent?.last_name}`;

				return ag;
			}) || [];

	const handleShare = async () =>
		await postRequest("/share_property", {
			property_id: propId,
			user_email: email,
		});
	const handleAssign = async () => {
		const selectedAgent = agents.find((agent) => {
			const ag = `${agent?.first_name} ${agent?.last_name}`;
			return ag === assignedAgent;
		});

		await assign(
			"/assign_property",
			{
				agent_id: selectedAgent?.user_id,
				property_id: propId,
			},
			(_, isSuccess) => {
				if (isSuccess) {
					loadOverView();
					setIsAssignModalShown(false);
				}
			}
		);
	};

	useEffect(() => {
		if (isSuccess) {
			loadOverView();
			setIsModalShown(false);
		}
	}, [isSuccess]);

	const isBrokerAdmin = user?.role === "broker_admin";
	const isSuperUser = user?.role === "broker_super_user";

	return (
		<div className='flex flex-col md:flex-row gap-4 md:items-center justify-between'>
			<div className='flex gap-2 items-center'>
				<Link href={"/properties"}>
					<IconContainer icon={<PropertyIcon />} />
				</Link>
				<Typography className='text-black dark:text-white font-semibold'>
					{address}
				</Typography>
			</div>
			<div className='flex flex-wrap gap-4'>
				{user?.role?.includes("broker") && (
					<Button
						className='border-pry text-pry lowercase first-letter:capitalize'
						variant='outlined'
						onClick={() => setIsModalShown(true)}
					>
						Share property
					</Button>
				)}
				{(isBrokerAdmin || isSuperUser) && (
					<Button
						className='border-pry text-pry lowercase first-letter:capitalize'
						variant='outlined'
						onClick={() => setIsAssignModalShown(true)}
					>
						Assign Agent
					</Button>
				)}
				<div className='flex gap-4'>
					<Button
						onClick={() => (isEdit ? editProperty() : setIsEdit(!isEdit))}
						className='bg-pry lowercase  flex items-center justify-center'
						loading={loadingState}
					>
						<Typography className='first-letter:capitalize'>
							{isEdit ? "Save" : "Edit property"}
						</Typography>
					</Button>
					<IconContainer icon={<Trash />} onClick={handledDelete} />
				</div>
			</div>
			<SharePropertyModal
				open={isModalShown}
				handleOpen={() => setIsModalShown(true)}
				closeModal={() => setIsModalShown(false)}
				email={email}
				loading={loading}
				handleShare={handleShare}
			/>
			<AssignPropertyModal
				open={isAssignModalShown}
				handleOpen={() => setIsAssignModalShown(true)}
				closeModal={() => setIsAssignModalShown(false)}
				loading={isAssigning}
				handleAssign={handleAssign}
				agents={allAgents}
				assignedAgent={assignedAgent}
				setAssignedAgent={setAssignedAgent}
			/>
		</div>
	);
};

export default PropertyDetailsHeader;
