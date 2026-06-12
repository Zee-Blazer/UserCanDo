import { ALLOCATION_DATA } from '../../../constants/chart-data';

// Custom label for donut chart - positioned outside the chart
export const renderCustomLabel = (entry: any) => {
    const { cx, cy, midAngle, outerRadius, percent, name } = entry;
    const RADIAN = Math.PI / 180;

    // Position labels outside the outer radius with more spacing
    const radius = outerRadius + 35; // Move labels further out to prevent overlap
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    // Find the data entry to get label color
    const dataEntry = ALLOCATION_DATA.find((item) => item.name === name);
    const labelColor = dataEntry?.labelColor || '#33CC33';

    return (
        <text
            x={x}
            y={y}
            fill={labelColor}
            textAnchor={x > cx ? 'start' : 'end'}
            dominantBaseline="central"
            fontSize={14}
            fontWeight={600}
        >
            {`${name}: ${(percent * 100).toFixed(0)}%`}
        </text>
    );
};

// Custom label line for donut chart
export const renderLabelLine = ({ cx, cy, midAngle, outerRadius }: any) => {
    const RADIAN = Math.PI / 180;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 5) * cos;
    const sy = cy + (outerRadius + 5) * sin;
    const mx = cx + (outerRadius + 20) * cos;
    const my = cy + (outerRadius + 20) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 10;
    const ey = my;

    return (
        <g>
            <line
                x1={sx}
                y1={sy}
                x2={mx}
                y2={my}
                stroke="#E0E0E0"
                strokeWidth={1}
            />
            <line
                x1={mx}
                y1={my}
                x2={ex}
                y2={ey}
                stroke="#E0E0E0"
                strokeWidth={1}
            />
        </g>
    );
};

