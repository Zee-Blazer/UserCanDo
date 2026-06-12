import React from "react";
import ListCard from "./listCard";
import { useDashboardSelector } from "@/Redux/selectors";
import { getTasks } from "@/utils/helpers";
import { useAppContext } from "@/app/context";

// Toggle Btn
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

import { DoughnutChart } from "./doughnutChart"; // Doughnut-Chart for Principal and Interest
import { BarChart } from "./barChart";


type PaymentTask = {
	serial: number;
	date: string;
	payment: string;
	principal: string;
	interest: string;
	remainBal: string;
};

interface Props {
  currentInterest: number | null; 
  currentPrincipal: number | null;
  paymentTasks: PaymentTask[];
}

const PaymentBreakdown = ({ currentInterest, currentPrincipal, paymentTasks }: Props) => {
	const { keeptrackScore, checklist, activeProperty } = useDashboardSelector();
	const tasks = getTasks(checklist, keeptrackScore);

	const { isChecklistFetching } = useAppContext();

    const [alignment, setAlignment] = React.useState('principal');

    const handleChange = (
        event: React.MouseEvent<HTMLElement>,
        newAlignment: string,
    ) => {
        setAlignment(newAlignment);
    };

    console.log(alignment);

	return (
		<ListCard
			title='Payment breakdown'
			hideEmptyState
			emptyStateText='No Data yet'
			loadingState={isChecklistFetching}
			bgWhite
		>
			<div className="bg-lightPry p-4">
                
            <ToggleButtonGroup
                color="primary"
                value={alignment}
                exclusive
                onChange={handleChange}
                aria-label="Platform"
            >
                <ToggleButton 
                    value="principal"
                    className="dark:bg-[#A61D4A0A]"
                    sx={{
                        '&.Mui-selected': {
                          backgroundColor: '#A61D4A',
                          color: 'white',
                          '&:hover': {
                            backgroundColor: '#90173F',
                            textTransform: 'none',
                          },
                        },
                        textTransform: 'none'
                      }}
                >
                  <span className="dark:text-white">Principal Vs Interest</span>
                </ToggleButton>
                <ToggleButton 
                    value="yearly"
                    className="dark:bg-[#A61D4A0A]"
                    sx={{
                      '&.Mui-selected': {
                        backgroundColor: '#A61D4A',
                        color: 'white',
                        '&:hover': {
                          backgroundColor: '#90173F',
                          textTransform: 'none',
                        },
                      },
                      textTransform: 'none'
                    }}
                >
                  <span className="dark:text-white">Yearly Breakdown</span>
                </ToggleButton>
            </ToggleButtonGroup>

            {
              alignment === "principal" &&
              <DoughnutChart
                currentPrincipal={ currentPrincipal }
                currentInterest={ currentInterest }
              />
            }

            {
              alignment === "yearly" && paymentTasks.length > 0 && (
                <BarChart paymentTasks={paymentTasks} />
              )
            }

          </div>
		</ListCard>
	);
};

export default PaymentBreakdown;
