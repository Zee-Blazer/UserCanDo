export default function DashboardPanels({
	panelList,
	selectedPanel,
	onPanelClick,
}: {
	panelList: { title: string; slug: string }[];
	selectedPanel: string;
	onPanelClick: (slug: string) => void;
}) {
	return (
		<div className='flex gap-x-6 items-center'>
			{panelList.map((panel) => (
				<div
					key={panel.slug}
					className={`flex items-center justify-center gap-2 cursor-pointer text-sm py-2 ${
						selectedPanel === panel.slug
							? "font-medium border-b border-[#F5AA29] text-[#101828]"
							: "font-normal text-[#6F6F6F]"
					}`}
					onClick={() => {
						onPanelClick(panel.slug);
					}}
				>
					<span>{panel.title}</span>
				</div>
			))}
		</div>
	);
}
