import React from 'react';

interface ProgressStageItem {
    title: string;
    dotColor: string; // color for the dot
    lineColor: string; // color for the line after the dot
    label?: string;
}

interface ProgressStageProps {
    stages: ProgressStageItem[];
}

const ProgressStage = ({ stages }: ProgressStageProps) => {
    return (
        <div className="w-full flex flex-col items-center">
            {/* Dots and lines in a row */}
            <div
                className="flex w-full items-center overflow-x-auto scrollbar-hide"
                style={{ WebkitOverflowScrolling: 'touch' }}
            >
                {stages.map((stage, idx) => (
                    <React.Fragment key={idx}>
                        <div
                            className="flex flex-col items-center px-1 sm:px-2 flex-1 min-w-[60px]"
                            style={{ position: 'relative' }}
                        >
                            <div className="flex items-center w-full">
                                {/* Dot */}
                                <div style={{ position: 'relative', zIndex: 2 }}>
                                    <div
                                        className="rounded-full"
                                        style={{
                                            width: 18,
                                            height: 18,
                                            background: stage.dotColor,
                                            border: `2px solid ${stage.dotColor}`,
                                            zIndex: 2,
                                        }}
                                    />
                                </div>
                                {/* Line after dot, except last */}
                                {idx < stages.length - 1 && (
                                    <div
                                        className="h-1 flex-1"
                                        style={{
                                            background: stage.lineColor,
                                            minWidth: 24,
                                            marginLeft: -2,
                                            zIndex: 1,
                                        }}
                                    />
                                )}
                                {/* If last element, add trailing line and dot */}
                                {idx === stages.length - 1 && (
                                    <>
                                        <div
                                            className="h-1 flex-1"
                                            style={{
                                                background: stage.lineColor,
                                                minWidth: 24,
                                                marginLeft: 8,
                                                zIndex: 1,
                                                opacity: 0.5,
                                            }}
                                        />
                                        <div style={{ position: 'relative', zIndex: 2, marginLeft: 8 }}>
                                            <div
                                                className="rounded-full"
                                                style={{
                                                    width: 18,
                                                    height: 18,
                                                    background: stage.dotColor,
                                                    border: `2px solid ${stage.dotColor}`,
                                                    zIndex: 2,
                                                }}
                                            />
                                        </div>
                                    </>
                                )}
                            </div>
                            {/* Title and label below */}
                            <span
                                className="mt-2 text-xs sm:text-sm md:text-base text-[#1E1E1E] text-center"
                                style={{ maxWidth: 120, whiteSpace: 'pre-line' }}
                            >
                                {stage.title}
                            </span>
                            {stage.label && (
                                <span
                                    className="text-[10px] sm:text-xs md:text-sm text-gray-500 text-center mt-1"
                                    style={{ maxWidth: 120 }}
                                >
                                    {stage.label}
                                </span>
                            )}
                        </div>
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
}

export default ProgressStage;
