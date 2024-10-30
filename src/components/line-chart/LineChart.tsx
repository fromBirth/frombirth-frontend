// @ts-ignore
import React from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

// Props 타입 정의
interface LineChartProps {
    labels: string[];
    chartData: number[];
}



// LineChart 컴포넌트를 정의합니다.
const LineChart: React.FC<LineChartProps> = ({labels, chartData}) => {
    // 그래프 데이터와 옵션을 설정합니다.
    const datasets = [
        {
            label: 'Chart Data',
            data: chartData,
            fill: false,
            borderColor: 'rgba(75,192,192,1)',
            tension: 0.1,
        },
    ];

    const data = {
        labels,
        datasets,
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: 'Sample Line Chart',
            },
        },
    };

    return <Line data={data} options={options} />;
};

export default LineChart;
