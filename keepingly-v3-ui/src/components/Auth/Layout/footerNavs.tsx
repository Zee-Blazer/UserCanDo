import { ROUTES } from "@/constants/routes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const FooterNavs = () => {
	const pathName = usePathname();
	const links = [
		{ href: ROUTES.terms, label: "Terms and service" },
		{ href: ROUTES.policy, label: "Privacy" },
		{ href: ROUTES.trustAndSecurity, label: "Trust and security" },
	];

	return (
		<div className='flex flex-col gap-2 mb-4'>
			{links.map((link, index) => {
				const isActive = pathName === link.href;
				return (
					<Link
						key={index}
						className={`${
							isActive ? "text-pry" : "text-black dark:text-white "
						} transition w-fit`}
						href={link.href}
					>
						{link.label}
					</Link>
				);
			})}
		</div>
	);
};

export default FooterNavs;
