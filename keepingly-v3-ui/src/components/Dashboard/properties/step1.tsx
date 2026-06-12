import { FormInput } from "@/components/General/form";
import AddressInput from "@/components/General/form/addressInput";
import { FormSelect } from "@/components/General/form/select";
import { useAuthSelector } from "@/Redux/selectors";
import { AddPropertyProps, AddressProps } from "@/types";
import { USAstates } from "@/types/mockData";
import { Typography } from "@material-tailwind/react";
import { MapPinLine } from "@phosphor-icons/react";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

interface PropertyFormStep1Props {
	notEditable?: boolean;
	disableEdit?: boolean;
	handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	propertyDetails: AddPropertyProps | null;
	formErrors: AddPropertyProps | null;
	setPropertyDetails?: React.Dispatch<
		React.SetStateAction<AddPropertyProps | null>
	>;
	initialEmail?: string | null;
}
const PropertyFormStep1 = ({
	notEditable,
	handleChange,
	propertyDetails,
	formErrors,
	setPropertyDetails,
}: // disableEdit,
// initialEmail,
PropertyFormStep1Props) => {
	const [address, setAddress] = useState<AddressProps | null>(null);
	const { user } = useAuthSelector();

	useEffect(() => {
		setPropertyDetails &&
			setPropertyDetails({
				...propertyDetails,
				address: address?.address,
				city: address?.city,
				state: address?.state,
				zipcode: address?.zipcode,
			});
	}, [address]);
	const query = useSearchParams();
	const isEditPage = query.get("id");

	return (
		<div className='w-full'>
			<Typography className='text-black dark:text-white font-medium mb-4'>
				Address information
			</Typography>

			<AddressInput
				readOnly={notEditable}
				placeholder='Address'
				name='address'
				handleChange={handleChange}
				error={formErrors?.address || ""}
				value={propertyDetails?.address || ""}
				setUserAddress={setAddress}
			/>

			<div className='grid grid-cols-1 mt-4 md:grid-cols-3 gap-4'>
				<FormInput
					readOnly={notEditable}
					placeholder='City'
					icon={<MapPinLine size={20} />}
					name='city'
					onChange={handleChange}
					error={formErrors?.city || ""}
					value={propertyDetails?.city || ""}
				/>
				<FormSelect
					readOnly={notEditable}
					placeholder='State'
					options={USAstates}
					icon={<MapPinLine size={20} />}
					name='state'
					onChange={handleChange}
					error={formErrors?.state || ""}
					value={propertyDetails?.state || ""}
				/>
				<FormInput
					readOnly={notEditable}
					placeholder='Zip code'
					icon={<MapPinLine size={20} />}
					name='zipcode'
					onChange={handleChange}
					error={formErrors?.zipcode || ""}
					value={propertyDetails?.zipcode || ""}
					type='number'
				/>
			</div>
			{isEditPage && (
				<>
					<Typography className='text-black dark:text-white font-medium mb-4 mt-6'>
						{user?.role === "homeowner"
							? "Authorised user information (Optional)"
							: "Owner information (Optional)"}
					</Typography>

					{/* <div className='grid grid-cols-1 mt-4 md:grid-cols-3 gap-4'>
						<FormInput
							readOnly={notEditable}
							placeholder='First name'
							icon={<User size={20} />}
							name='first_name'
							onChange={handleChange}
							error={formErrors?.first_name || ""}
							value={propertyDetails?.first_name || ""}
						/>
						<FormInput
							readOnly={notEditable}
							placeholder='Middle name'
							icon={<User size={20} />}
							name='middle_name'
							onChange={handleChange}
							error={formErrors?.middle_name || ""}
							value={propertyDetails?.middle_name || ""}
						/>
						<FormInput
							readOnly={notEditable}
							placeholder='Last name'
							icon={<User size={20} />}
							name='last_name'
							onChange={handleChange}
							error={formErrors?.last_name || ""}
							value={propertyDetails?.last_name || ""}
						/>
						<FormInput
							placeholder='Email address'
							icon={<EnvelopeSimple size={20} />}
							//@ts-ignore
							readOnly={disableEdit && initialEmail}
							name='email'
							onChange={handleChange}
							error={formErrors?.email || ""}
							value={propertyDetails?.email || ""}
						/>
						<FormInput
							readOnly={notEditable}
							placeholder='Phone number'
							icon={<Phone size={20} />}
							name='phone_number'
							onChange={handleChange}
							error={formErrors?.phone_number || ""}
							value={propertyDetails?.phone_number || ""}
							type='tel'
						/>
					</div> */}
				</>
			)}
		</div>
	);
};

export default PropertyFormStep1;
