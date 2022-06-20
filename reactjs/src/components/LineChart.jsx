import React from 'react'
import { Chart as ChartJS, registerables} from 'chart.js';
import { Chart } from 'react-chartjs-2';


const LineChart = (props) => {
    const{datas}= props;
    
    ChartJS.register(...registerables);

    const data = () => {
        return{
            datasets:[{
                label: '',
                borderColor:'#5185F7',
                borderWidth: 2,
                pointBorderWidth: 0.5,
                pointRadius: 0.5,
                pointHoverBackgroundColor: '#5185F7',
                pointHoverBorderColor:'#F7F7F7',
                pointHoverBorderWidth: 4,
                pointHoverRadius: 7,
                backgroundColor: (context) => {
                    const ctx = context.chart.ctx;
                    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
                    gradient.addColorStop(0, "#CEDDFF");
                    gradient.addColorStop(1, "rgba(206, 221, 255, 0)");
                    return gradient;},
                data:datas,
                fill: true,
                tension: 0.5,
                order: 1,
            }]
        }
        }

    const options ={
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                backgroundColor: '#5185F7',
                callbacks: {
                    title : () => null
                 },
                displayColors: false,
                yAlign: 'bottom',
                cornerRadius: 15,
             },
        scales:{
            x:{
                grid:{
                    display: false
                },
            },
            y:{
                beginAtZero: true,
                suggestedMax: 6000,
                grid:{
                    display: false
                },
            },
        }
    }
}

  return (
    
    <div>
        <Chart type='line' data={data()} height={373} width={754} options={options} />
    </div>
  )
}

export default LineChart