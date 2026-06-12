import React, { useState } from 'react';

import MortgageCalculator from "./mortgageCalculator";
import PaymentSchedule from "./paymentSchedule";
import PaymentBreakdown from './paymentBreakdown';

type PaymentTask = {
    serial: number;
    date: string;
    payment: string;
    principal: string;
    interest: string;
    remainBal: string;
  };

const CalculatorContainer = () => {

    const [paymentTasks, setPaymentTasks] = useState<PaymentTask[]>([]);

    const [currentPrincipal, setCurrentPrincipal] = useState<number | null>(null);
    const [currentInterest, setCurrentInterest] = useState<number | null>(null);

    return (
        <>
            <div className='mt-5'>
                <MortgageCalculator 
                    paymentTasks={ paymentTasks }
                    setPaymentTasks={ setPaymentTasks }
                    currentPrincipal={ currentPrincipal } setCurrentPrincipal={ setCurrentPrincipal }
                    currentInterest={ currentInterest } setCurrentInterest={ setCurrentInterest }
                />
            </div>

            <div className='mt-5'>
                <PaymentSchedule 
                    paymentTasks={ paymentTasks }
                />
            </div>

            <div className='mt-5'>
                <PaymentBreakdown 
                    currentPrincipal={ currentPrincipal }
                    currentInterest={ currentInterest }
                    paymentTasks={ paymentTasks }
                />
            </div>
        </>
    )
}

export default CalculatorContainer;
