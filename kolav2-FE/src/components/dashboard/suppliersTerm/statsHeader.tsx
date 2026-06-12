import { MoneyIcon } from "@/assets/svg";

export interface StatItem {
  title: string;
  value: number;
  color: string;
  textColor: string;
  iconColor: string;
};

interface StatsHeaderProps {
  stats: StatItem[];
};


const StatsHeader = ({ stats }: StatsHeaderProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4 my-4">
      {stats?.map((stat, i) => (
        <div
          key={i}
          className="flex items-center gap-3 bg-white p-4 rounded-lg border border-[#D5D8DC]"
        >
          <div
            className="p-2 rounded-full"
            style={{ backgroundColor: stat.color }}
          >
            <MoneyIcon color={stat?.iconColor} />
          </div>
          <div>
            <p
              className="text-xl font-semibold"
              style={{ color: stat.textColor }}
            >
              {stat.value}
            </p>
            <p className="text-xs text-[#6F6F6F]">{stat.title}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
export default StatsHeader
