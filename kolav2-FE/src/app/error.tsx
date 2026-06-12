"use client";

import { useEffect, useMemo } from "react";

// Define error info interface
interface ErrorInfo {
	componentStack?: string;
}

// Structured error details interface
interface ErrorDetails {
	file: string;
	line: number;
	column: number;
}

// Industry-standard error logging (mock Sentry integration)
function logErrorToService(error: Error, info: ErrorInfo): void {
	console.error("Error occurred:", {
		message: error.message,
		stack: error.stack,
		...info,
	});
}

// Robust stack trace parser
function parseStackTrace(stack: string | undefined): ErrorDetails | null {
	if (!stack) return null;

	try {
		const stackLines = stack.split("\n").filter(Boolean);
		const errorLine = stackLines[1]; // Second line typically has the origin

		if (!errorLine) return null;

		// Match common stack trace formats (Chrome, Firefox, etc.)
		const match = errorLine.match(/at\s+(?:.*\s+)?\(?(.+):(\d+):(\d+)\)?$/);
		if (match) {
			const [, file, line, column] = match;
			return {
				file: file.split("/").pop() || "Unknown file",
				line: parseInt(line, 10) || 0,
				column: parseInt(column, 10) || 0,
			};
		}

		return null;
	} catch (e) {
		console.warn("Failed to parse stack trace:", e);
		return null;
	}
}

// Props interface
interface ErrorProps {
	error: Error | null;
	reset: () => void;
}

// Reusable Error Detail component
const ErrorDetailItem: React.FC<{ label: string; value: string | number }> = ({
	label,
	value,
}) => (
	<p className='text-gray-800'>
		<strong className='font-semibold'>{label}:</strong> {value}
	</p>
);

// Main Error component
export default function Error({ error, reset }: ErrorProps) {
	useEffect(() => {
		if (error) {
			logErrorToService(error, { componentStack: error.stack });
		}
	}, [error]);

	const errorDetails = useMemo(() => parseStackTrace(error?.stack), [error]);

	return (
		<div className='min-h-screen flex items-center justify-center bg-gray-100 p-4'>
			<section
				className='bg-white p-6 rounded-lg shadow-lg max-w-md w-full text-center'
				role='alert'
				aria-live='polite'
			>
				<h2 className='text-2xl font-bold text-red-600 mb-2'>
					Something went wrong!
				</h2>
				<p className='text-gray-600 mb-4'>
					{error?.message || "An unexpected error occurred."}
				</p>

				{errorDetails && (
					<div className='mb-6 space-y-2 text-left'>
						<ErrorDetailItem label='File' value={errorDetails.file} />
						<ErrorDetailItem
							label='Location'
							value={`Line ${errorDetails.line}, Column ${errorDetails.column}`}
						/>
					</div>
				)}

				{error?.stack && (
					<details className='mb-6 bg-gray-50 p-2 rounded'>
						<summary className='cursor-pointer text-blue-600 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500'>
							Stack Trace
						</summary>
						<pre className='mt-2 text-sm text-gray-700 overflow-auto max-h-48'>
							{error.stack}
						</pre>
					</details>
				)}

				<div className='flex justify-center gap-4'>
					<button
						onClick={reset}
						className='px-4 py-2 bg-pry2 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors'
					>
						Try Again
					</button>
					<button
						onClick={() => window.location.assign("/")}
						className='px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors'
					>
						Go Home
					</button>
				</div>
			</section>
		</div>
	);
}
