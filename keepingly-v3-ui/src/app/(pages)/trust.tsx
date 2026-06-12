"use client";
import React from "react";

const Trust = () => {
	return (
		<div>
			{/* <Typography className='text-3xl text-black dark:text-white font-semibold mb-4'>
				Security
			</Typography> */}
			<p>
				At Keepingly, your data security is of utmost priority. We have taken a
				holistic approach to ensure that our platform is robust, secure, and
				reliable for our customers hence instilling confidence in our platform.
				Here are some of the key security practices we&apos;ve put into effect:
			</p>
			<div className='flex flex-col gap-4 mt-4'>
				<li className='list-decimal font-bold'>Data Encryption</li>
				<p>
					We enforce strong encryption, defending your data in transit and at
					rest, keeping your sensitive information safe from unauthorized
					access.
				</p>
				<li className='list-decimal font-bold'>Secure Authentication</li>
				<p>
					We enforce strong password policies that ensure your account is
					accessible to you alone. Moreover, we encourage users to enable
					multi-factor authentication to add an additional layer of security.
				</p>
				<li className='list-decimal font-bold'>
					Role-Based Access Control (RBAC)
				</li>
				<p>
					We use Role-Based Access Control on our platform, which provides users
					with access only to the data and functionality required. This reduces
					the likelihood of unauthorized access and, should a breach occur,
					limits the damage that could be caused.
				</p>
				<li className='list-decimal font-bold'>Regular Security Testing</li>
				<p>
					Regular security audits, penetration testing, and vulnerability
					scanning go on from time to time with the intent of staying ahead of
					pending threats. This proactive approach helps us in identifying and
					addressing security risks much before they turn out to be issues.
				</p>
				<li className='list-decimal font-bold'>Secure Development Practices</li>
				<p>
					We follow secure coding practices and utilize native security controls
					in our development frameworks. All these cut down on vulnerabilities,
					adding security to the platform.
				</p>
				<li className='list-decimal font-bold'>Data Isolation</li>
				<p>
					We provide for the appropriate isolation of user data in our
					multi-tenancy platform. Data isolation prevents unauthorized access to
					other customers&apos; data, thereby allowing our customers to rest
					easy.
				</p>
				<li className='list-decimal font-bold'>Logging</li>
				<p>
					Our platform is designed with extensive logging to store users&apos;
					requests. This allows us to act fast on any security incident that may
					arise and protect users&apos; data.
				</p>
				<li className='list-decimal font-bold'>Secure APIs</li>
				<p>
					All our APIs are secured with proper authentication and rate limiting.
					We make sure that only the authorized systems and users have access to
					data.
				</p>
				<li className='list-decimal font-bold'>Patch Management </li>
				<p>
					We ensure all software dependencies, libraries, and servers are
					up-to-date with the latest security patches, which helps keep our
					platform safe from emerging threats.
				</p>
			</div>
		</div>
	);
};

export default Trust;
