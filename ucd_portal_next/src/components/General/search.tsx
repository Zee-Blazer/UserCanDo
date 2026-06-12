import React from "react";
import { FormInput } from "./form";
import { MagnifyingGlass } from "@phosphor-icons/react";

const Search = () => {
	return <FormInput icon={<MagnifyingGlass size={20} />} iconPosition='left' />;
};

export default Search;
