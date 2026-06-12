import { FC, useRef, useEffect, useState } from "react";
import TanHeader from "./header";
import TanRows from "./rows";

interface TanBodyProps {
	table: any;
	loadingState?: boolean;
	onClick?: () => void;
}

const TanBody: FC<TanBodyProps> = ({ table, onClick }) => {
	const scrollContainerRef = useRef<HTMLDivElement>(null);
	const [isDragging, setIsDragging] = useState(false);
	const [startX, setStartX] = useState(0);
	const [scrollLeft, setScrollLeft] = useState(0);

	useEffect(() => {
		const scrollContainer = scrollContainerRef.current;
		if (!scrollContainer) return;

		const handleMouseDown = (e: MouseEvent) => {
			setIsDragging(true);
			setStartX(e.pageX - scrollContainer.offsetLeft);
			setScrollLeft(scrollContainer.scrollLeft);
		};

		const handleMouseUp = () => {
			setIsDragging(false);
		};

		const handleMouseMove = (e: MouseEvent) => {
			if (!isDragging) return;
			e.preventDefault();
			const x = e.pageX - scrollContainer.offsetLeft;
			const walk = (x - startX) * 2; // Adjust scrolling speed here
			scrollContainer.scrollLeft = scrollLeft - walk;
		};

		scrollContainer.addEventListener("mousedown", handleMouseDown);
		window.addEventListener("mouseup", handleMouseUp);
		window.addEventListener("mousemove", handleMouseMove);

		return () => {
			scrollContainer.removeEventListener("mousedown", handleMouseDown);
			window.removeEventListener("mouseup", handleMouseUp);
			window.removeEventListener("mousemove", handleMouseMove);
		};
	}, [isDragging, startX, scrollLeft]);

	return (
		<div
			ref={scrollContainerRef}
			className={`overflow-x-auto overflowXHide rounded-lg ${
				isDragging ? "cursor-grabbing" : "cursor-default"
			} overflowHide`}
		>
			<table className='w-full  max-w-full'>
				<TanHeader table={table} />
				<TanRows table={table} onClick={onClick} />
			</table>
		</div>
	);
};

export default TanBody;
