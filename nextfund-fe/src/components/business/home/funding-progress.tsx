
interface ProgressListProps {
    label: string,
    value: string | number;
}

interface Props {
    percent: number,
    progressList?: ProgressListProps[]
}

const FundingProgress = ({ percent, progressList }: Props) => {

    return (
        <div className="mt-5">
            <div>
                <h2 className="text-lg font-bold">Funding Progress</h2>
                <p className="text-sm text-gray-500">Track your funding progress over time</p>
            </div>

            <div className="p-5 border border-[#EEF1F4] my-3 bg-white">
                <p className="text-[#6A6A6A] text-sm">Total Progress</p>

                <div
                    className="w-full h-6 bg-gray-200 rounded-lg mt-2"
                >
                    <div
                        className={`h-6 bg-[#043A66] ${percent !== 100 ? 'rounded-tl-lg rounded-bl-lg' : 'rounded-lg'}`}
                        style={{ width: `${percent}%` }}
                    ></div>
                </div>

                <div className="mt-3 flex justify-between text-sm text-[#6A6A6A] gap-4">
                    {progressList && progressList.length > 0 ? (
                        progressList.map((item, idx) => (
                            <div key={idx}>
                                <p>{item.label}</p>
                                <p className="text-sm font-medium text-[#1E1E1E]">{typeof item.value === 'number' ? item.value.toLocaleString() : item.value}</p>
                            </div>
                        ))
                    ) : (
                        <></>
                    )}
                </div>
            </div>
        </div>
    )
}

export default FundingProgress;
