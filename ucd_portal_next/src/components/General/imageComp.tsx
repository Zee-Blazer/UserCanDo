import { useState, useEffect } from "react";
import Image, { ImageProps } from "next/image";
import { ImageBroken } from "@phosphor-icons/react";
import { Sentry } from "react-activity";

interface LazyImageProps extends ImageProps {
	fallbackSrc?: string;
	className?: string;
}

const LazyImage: React.FC<LazyImageProps> = ({
	src,
	alt,
	fallbackSrc,
	className,
	...props
}) => {
	const [isLoaded, setIsLoaded] = useState(false);
	const [imageSrc, setImageSrc] = useState(src as string);
	const [hasError, setHasError] = useState(false);

	// Reset image state when the source changes
	useEffect(() => {
		if (src) {
			setImageSrc(src as string);
			setHasError(false);
			setIsLoaded(false);
		}
	}, [src]);

	const handleImageLoad = () => {
		setIsLoaded(true);
		setHasError(false);
	};

	const handleImageError = () => {
		if (fallbackSrc) {
			setImageSrc(fallbackSrc);
		} else {
			setHasError(true);
		}
		setIsLoaded(false);
	};
	// console.log(isLoaded, hasError, imageSrc);
	return (
		<div className={`relative w-full h-full ${className}`}>
			{!isLoaded && (
				<div className='absolute inset-0 flex items-center justify-center bg-lightBg dark:bg-darkBg animate-pulse'>
					<Sentry />
				</div>
			)}

			{!hasError && imageSrc ? (
				<Image
					src={imageSrc}
					alt={alt}
					{...props}
					onLoad={handleImageLoad}
					onError={handleImageError}
					className={`transition-opacity duration-500 ease-in-out ${
						isLoaded ? "opacity-100" : "opacity-0"
					} ${className}`}
				/>
			) : (
				<div className='w-full h-full flex items-center justify-center bg-lightBg dark:bg-darkBg'>
					<ImageBroken size={50} className='text-gray-500' />
				</div>
			)}
		</div>
	);
};

export default LazyImage;
