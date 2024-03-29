import React from 'react'
import { Chart as ChartJS, registerables} from 'chart.js';
import { Chart } from 'react-chartjs-2';

const doughnut = (props) => {
    const {value} =props;
    ChartJS.register(...registerables);
    const data = ()=>{
        return{
            datasets: [{
                data: [value.v1, value.v2],
                backgroundColor: [
                  value.c1,
                  '#EAEAEC',
                ],
                cutout: '90%',
                borderWidth: 0
            }]
        }
    }

    const options={
        plugins: {
            legend: {
                display: false
            },
            tooltip:{
              enabled: false,
            }
        }
    }
  return (
    <Chart type='doughnut' data={data()} options={options}/>
  )
}

export default doughnut