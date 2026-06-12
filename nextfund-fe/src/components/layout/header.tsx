import { Button } from '@/components/General/ui';
import { NAVIGATION_ITEMS } from '@/constants';
import { Close as CloseIcon, Menu as MenuIcon } from '@mui/icons-material';
import { AppBar, Drawer, IconButton, List, ListItem, ListItemText, Toolbar, useMediaQuery, useTheme } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import logo from "../../../public/logo.png";

export const Header: React.FC<{ hideNavigation?: boolean }> = ({ hideNavigation = false }) => {
	const [mobileOpen, setMobileOpen] = useState(false);
	const [currentPath, setCurrentPath] = useState('');
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("md"));


	useEffect(() => {
		if (typeof window !== 'undefined') {
			setCurrentPath(window.location.pathname);
		}
	}, []);

	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen);
	};

	const handleNavigationClick = () => {
		setMobileOpen(false);
	};


	const isActiveRoute = (href: string) => {
		return currentPath === href;
	};

	const mobileDrawer = (
		<div className="w-64">
			<div className="flex items-center justify-between p-5">
				<Image src={logo} alt="Nexfund" width={120} height={120} />
				<IconButton onClick={handleDrawerToggle}>
					<CloseIcon sx={{ color: '#043A66' }} />
				</IconButton>
			</div>
			<List>
				{!hideNavigation && NAVIGATION_ITEMS.map((item) => {
					const isActive = isActiveRoute(item.href);
					return (
						<Link key={item.label} href={item.href} onClick={handleNavigationClick}>
							<ListItem
								className={`px-4 py-2 cursor-pointer transition-all duration-200 ${isActive
									? 'bg-green-50 border-r-4 border-[#33CC33]'
									: 'hover:bg-gray-50 hover:border-r-4 hover:border-[#33CC33]'
									}`}
							>
								<ListItemText
									primary={item.label}
									className={`${isActive
										? 'text-[#33CC33] font-semibold'
										: 'text-gray-700 hover:text-[#33CC33] hover:font-semibold'
										}`}
								/>
							</ListItem>
						</Link>
					);
				})}
				<ListItem className="px-4 py-2">
					<Link href="/sign-in" className="w-full">
						<Button
							variant="outline"
							size="sm"
							className="w-full mb-2 !border-[#33CC33] !text-[#33CC33] hover:!bg-opacity-10 cursor-pointer"
						>
							Log in
						</Button>
					</Link>
				</ListItem>
				<ListItem className="px-4 py-2">
					<Link href="/sign-up" className="w-full">
						<Button
							variant="primary"
							size="sm"
							className="w-full !bg-[#33CC33] hover:!bg-[#2eb82e] !text-white cursor-pointer"
						>
							Sign up
						</Button>
					</Link>
				</ListItem>
			</List>
		</div>
	);

	return (
		<>
			<AppBar
				position="static"
				elevation={0}
				className="bg-transparent mb-7"
				sx={{ backgroundColor: 'transparent' }}
			>
				<Toolbar className="max-w-7xl mx-auto w-full mt-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
					<div className="flex items-center space-x-2 flex-shrink-0">
						<Link href="/">
							<Image src={logo} alt="Nexfund" width={150} height={150} style={{ cursor: 'pointer' }} />
						</Link>
					</div>

					<div className="flex items-center">
						{/* Desktop Navigation */}
						{!isMobile && !hideNavigation && (
							<nav className="hidden md:flex items-center space-x-12 mr-[5rem]">
								{NAVIGATION_ITEMS.map((item) => {
									const isActive = isActiveRoute(item.href);
									return (
										<Link
											key={item.label}
											href={item.href}
											className={`relative pb-2 text-lg transition-all duration-200 ${isActive
												? '!text-[#33CC33] font-bold'
												: 'hover:text-[#33CC33] !text-[#043A66] font-medium hover:font-bold'
												} group`}
										>
											{item.label}
											<span
												className={`absolute bottom-0 left-0 h-0.5 bg-[#33CC33] rounded-full transition-all duration-300 ${isActive
													? 'w-full'
													: 'w-0 group-hover:w-full'
													}`}
											></span>
										</Link>
									);
								})}
							</nav>
						)}

						{/* Right side buttons */}
						<div className="flex items-center space-x-4">
							{!isMobile ? (
								<>
									<Link href="/sign-in">
										<Button
											variant="outline"
											size="sm"
											className="!border-[#33CC33] !text-[#33CC33]  hover:!bg-opacity-10 !focus:ring-[#33CC33] cursor-pointer"
										>
											Log in
										</Button>
									</Link>
									<Link href="/sign-up">
										<Button
											variant="primary"
											size="sm"
											className="!bg-[#33CC33] hover:!bg-[#2eb82e] !text-white !focus:ring-[#33CC33] cursor-pointer"
										>
											Sign up
										</Button>
									</Link>
								</>
							) : !hideNavigation ? (
								<IconButton
									edge="start"
									color="inherit"
									aria-label="menu"
									onClick={handleDrawerToggle}
									className="text-gray-700"
								>
									<MenuIcon sx={{ color: '#043A66' }} />
								</IconButton>
							) : null}
						</div>
					</div>
				</Toolbar>
			</AppBar>

			{!hideNavigation && (
				<Drawer
					variant="temporary"
					anchor="right"
					open={mobileOpen}
					onClose={handleDrawerToggle}
					ModalProps={{
						keepMounted: true,
					}}
				>
					{mobileDrawer}
				</Drawer>
			)}
		</>
	);
};