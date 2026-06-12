"use client";
import AuthHeader from "@/components/auth/authHeader";
import { useSearchParams } from "next/navigation";
import { slides2 } from "@/app/create-account/slides";
import { useAuth } from "@/context/authContext";
import usePreventRefresh from "@/api/hooks/usePreventRefresh";
import { useEffect } from "react";

const CreateBusinessPage = () => {
	const { activeSlideIndex, setBusinessProfileInputs, businessProfileInputs } =
		useAuth();
	const query = useSearchParams();
	usePreventRefresh(true);
	const id = query.get("user_id");

	useEffect(() => {
		if (id) setBusinessProfileInputs({ ...businessProfileInputs, user_id: id });
	}, [id]);

	return (
		<div className='h-screen w-screen bg-white'>
			<AuthHeader />
			<div className='relative h-full w-full overflow-x-hidden'>
				{slides2.map((slide, index) => (
					<div
						key={index}
						className={`absolute top-0 left-0 w-full h-full transition-transform duration-1000 ease-in-out ${
							index === activeSlideIndex
								? "translate-x-0 opacity-100"
								: index < activeSlideIndex
								? "-translate-x-full opacity-0"
								: "translate-x-full opacity-0"
						} p-4`}
					>
						{slide}
					</div>
				))}
			</div>
		</div>
	);
};

export default CreateBusinessPage;
