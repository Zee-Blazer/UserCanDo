
interface TabDetail {
    label: string;
    value: string;
}

interface Props {
    title: string;
    tabDetails: TabDetail[];
}

const TabularFormat = ({ title, tabDetails }: Props) => {
    return (
        <div>
            <h3 className="text-base font-bold text-[#1E1E1E] mb-4">
                {title}
            </h3>

            <div>
                {tabDetails.map((item) => (
                    <div key={item.label} className="flex justify-between py-3.5 px-3 border bg-[#FAFAFA] border-[#EEF1F4]">
                        <p className="text-sm text-[#1E1E1E]">{item.label}</p>
                        <p className="text-sm text-[#1E1E1E] font-medium">{item.value}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default TabularFormat;
