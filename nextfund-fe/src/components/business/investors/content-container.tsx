import { ReactNode } from "react";
import BgCover from "./bg-cover";

type NavigationType = 'users' | 'dueDiligence' | 'investments';

interface ContentContainerProps {
    text?: string;
    showSidenav?: boolean;
    enableNavigation?: boolean;
    navigationType?: NavigationType;
    children: ReactNode;
}

const ContentContainer = ({ text, showSidenav, enableNavigation = false, navigationType = 'users', children }: ContentContainerProps) => {
    return (
        <div>
            <BgCover
                sidenav={showSidenav}
                text={text || "Management"}
                enableNavigation={enableNavigation}
                navigationType={navigationType}
            />
            <div className="bg-white p-5 w-11/12 -mt-28 mx-auto">
                {children}
            </div>
        </div>
    );
};

export default ContentContainer;
