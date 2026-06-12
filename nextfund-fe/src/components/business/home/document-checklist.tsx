
import { Check, Download, File, Newspaper } from "lucide-react";
import toast from "react-hot-toast";

interface DocumentProps {
    title: string;
    description?: string;
    isCompleted?: { status: boolean };
    info?: {
        type?: string;
        timeStamp?: string,
        download?: boolean,
        url?: string,
        checkStatus?: boolean,
        text?: string,
    };
    checkStatus?: boolean;
}

interface Props {
    title: string;
    type?: string;
    subTitle?: string;
    documents: DocumentProps[]
}

const DocumentChecklist = ({ title, type, subTitle, documents }: Props) => {

    const handleDocumentClick = (doc: DocumentProps) => {
        if (doc.info?.url) {
            window.open(`https://docs.google.com/gview?url=${doc.info?.url}&embedded=true`, "_blank", "noopener,noreferrer");
        } else {
            toast.error("This document has not been uploaded or is not available yet.");
        }
    };

    return (
        <div className="mt-8">
            <div>
                <h2 className="text-lg font-bold">{title}</h2>
                <p className="text-sm text-gray-500">{subTitle}</p>
            </div>

            <div className="mt-3">
                {documents && documents.length > 0 && documents.map((doc, idx) => (
                    <div
                        key={idx}
                        className="flex justify-between items-center p-5 border border-[#EEF1F4] bg-white transition-colors duration-200 hover:bg-blue-50 hover:border-blue-200 cursor-pointer"
                        style={{ margin: 0 }}
                        onClick={() => handleDocumentClick(doc)}
                    >
                        <div className="flex">
                            {
                                type ? type === "file" ? (
                                    <File size={18} className="text-[#043A66]" />
                                ) :
                                    type === "check" ? (
                                        <div className={`
                                            flex items-center justify-center h-8 w-8 ${doc.info?.checkStatus ? "bg-[#33CC33]" : "bg-white"} rounded-md border border-[#EEF1F4] mr-3 
                                        `}>
                                            <Check size={20} className={`check ${doc.info?.checkStatus ? "text-white" : "text-[#043A66]"}`} />
                                        </div>
                                    ) : (
                                        <Newspaper size={18} className="text-[#043A66]" />
                                    )
                                    :
                                    <></>
                            }
                            <div className="-mt-2 ml-2">
                                <h3 className="text-base font-medium text-[#1E1E1E]">{doc.title}</h3>
                                <p className="text-sm text-[#1E1E1E]">{doc.description}</p>
                            </div>
                        </div>

                        <div>
                            {
                                doc.isCompleted && (
                                    <button
                                        className="border p-3 cursor-pointer border-[#EEF1F4] rounded-lg text-[#043A66] bg-white transition-colors duration-150 hover:bg-[#043A66F8] hover:text-white hover:bg-opacity-5"
                                    >
                                        {doc.isCompleted.status ? 'Completed' : 'Incomplete'}
                                    </button>
                                )
                            }

                            {
                                doc.info && (
                                    <div>
                                        {
                                            doc.info.timeStamp && (
                                                <div className="flex items-center gap-2">
                                                    <p className="text-sm text-gray-500">
                                                        {doc.info.timeStamp}
                                                    </p>
                                                    {
                                                        doc.info.download && (
                                                            <Download
                                                                size={16}
                                                                className="cursor-pointer text-[#000000] hover:text-[#1E1E1E]"
                                                            />
                                                        )
                                                    }
                                                </div>
                                            )
                                        }
                                        {
                                            doc.info.type && (
                                                <p
                                                    className={`
                                                        px-2 py-1 rounded-lg text-xs
                                                        ${doc.info.type.toLowerCase() === 'verified' || doc.info.type.toLowerCase() === 'active'
                                                            ? 'border border-green-600 text-green-600'
                                                            : doc.info.type.toLowerCase() === 'pending'
                                                                ? 'border border-yellow-500 text-yellow-600'
                                                                : 'border border-red-600 text-red-600'
                                                        }
                                                    `}
                                                >
                                                    {doc.info.type}
                                                </p>
                                            )
                                        }
                                        {
                                            doc.info.text && (
                                                <p className="text-[10px] text-[#043A66] underline mt-1">
                                                    {doc.info.text}
                                                </p>
                                            )
                                        }
                                    </div>
                                )
                            }
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default DocumentChecklist;
