
import { LucideIcon } from "lucide-react"; // Make sure lucide-react is installed

interface CircularProgressProps {
  size?: number;
  strokeWidth?: number;
  percentage: number;
  color?: string;
  icon?: LucideIcon;
  iconColor?: string;
}

const CircularProgress = ({
  size = 120,
  strokeWidth = 8,
  percentage,
  color = "#3B82F6", // Default: Tailwind blue-500
  icon: Icon,
  iconColor = "#1F2937", // Default: Tailwind gray-800
}: CircularProgressProps) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progressOffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          stroke="#E5E7EB" // gray-200
          fill="transparent"
          strokeWidth={strokeWidth}
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        <circle
          stroke={color}
          fill="transparent"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={progressOffset}
          strokeLinecap="round"
          r={radius}
          cx={size / 2}
          cy={size / 2}
          style={{ transition: "stroke-dashoffset 0.35s" }}
        />
      </svg>

      {/* Icon in center */}
      {Icon && (
        <Icon
          size={size / 2}
          color={iconColor}
          className="absolute"
        />
      )}
    </div>
  );
};

export default CircularProgress;
