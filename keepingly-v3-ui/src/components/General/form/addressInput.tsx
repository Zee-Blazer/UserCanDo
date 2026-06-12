import React, { ChangeEventHandler, Dispatch, SetStateAction } from "react";
import FormInput from "./input";
import { usePlacesWidget } from "react-google-autocomplete";
import { AddressProps } from "@/types";
interface AddressInputProps {
	bgColor?: string;
	readOnly?: boolean;
	handleChange: ChangeEventHandler<HTMLInputElement>;
	value: string;
	error: string;
	placeholder: string;
	name: string;
	setUserAddress?: Dispatch<SetStateAction<AddressProps | null>>;
}
const AddressInput = ({
	error,
	value,
	readOnly,
	placeholder,
	name,
	setUserAddress,
	handleChange,
}: AddressInputProps) => {
	const { ref } = usePlacesWidget({
		apiKey: process.env.NEXT_PUBLIC_GOOGLE_KEY,
		options: {
			types: ["address"],
			componentRestrictions: { country: "US" },
			zIndex: 9999,
		},
		onPlaceSelected: (addr) => {
			const place = addr?.address_components;
			const address = place.reduce(
				(
					seed: any,
					{ long_name, types }: { long_name: string; types: any[] }
				) => (types.forEach((t) => (seed[t] = long_name)), seed),
				{}
			);
			const address1 = addr?.formatted_address;
			const state = address?.administrative_area_level_1;
			const city = address?.locality;
			const zipcode = address?.postal_code;
			setUserAddress &&
				setUserAddress({ address: address1, city, state, zipcode });
		},
	});
	return (
		<FormInput
			readOnly={readOnly}
			placeholder={placeholder}
			name={name}
			onChange={handleChange}
			error={error}
			value={value}
			inputRef={ref}
		/>
	);
};

export default AddressInput;
