import { AppProps } from "@/types";
import { useAuthSelector } from "@/Redux/selectors";

const Main = ({ auth, broker, homeowner, appraiser }: AppProps) => {
	const { isLoggedIn, user } = useAuthSelector();
	const role = user?.role;

	const renderContent = () => {
		if (!isLoggedIn || !role) return auth;
		const isBroker = role?.includes("broker");
		const isHomeowner = role?.includes("homeowner");
		const isAppraiser = role?.includes("appraiser");

		return isBroker
			? broker
			: isHomeowner
			? homeowner
			: isAppraiser
			? appraiser
			: auth;
	};

	return renderContent();
};

export default Main;
