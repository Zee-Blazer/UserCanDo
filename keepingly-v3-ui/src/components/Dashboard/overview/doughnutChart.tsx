// components/DoughnutChart.tsx

'use client';

import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartOptions
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

interface Props {
  currentInterest: number | null; 
  currentPrincipal: number | null;
}

const options: ChartOptions<'doughnut'> = {
    plugins: {
      legend: {
        position: 'bottom', // ✅ Now it's recognized properly
      },
    },
  };

export const DoughnutChart = ({ currentInterest, currentPrincipal }: Props) => {

  const data = {
    labels: ['Principal', 'Interest'],
    datasets: [
      {
        label: 'account',
        data: [currentPrincipal == null ? 100 : currentPrincipal, currentInterest == null ? 0 : currentInterest],
        backgroundColor: ['#A61D4A', '#28264B'],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="w-80 mt-4 mx-auto">
      <Doughnut data={data} options={ options } />
    </div>
  );
};
