interface DividerProps {
	color?: string;
}

interface CircularDividerProps extends DividerProps {
	size: number;
}

interface HorizontalDividerProps extends DividerProps {
	gapT?: number;
	gapB?: number;
}

export const CircularDivider = ({ size, color }: CircularDividerProps) => {
	return (
		<div
			style={{ width: size, height: size, backgroundColor: color }}
			className='rounded-full'
		/>
	);
};

export const HorizontalDivider = ({
	color,
	gapT,
	gapB,
}: HorizontalDividerProps) => {
	return (
		<div
			style={{ borderBottomColor: color, marginTop: gapT, marginBottom: gapB }}
			className='w-full border-b-[1px]'
		/>
	);
};
