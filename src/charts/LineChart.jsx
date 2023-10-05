import React, { useEffect, useState } from 'react';
import { Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,} from 'chart.js';
import {Line} from 'react-chartjs-2';

ChartJS.register(
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler, // used to fill chart area
  Legend
)

const base_URL = 'https://api.coinranking.com/v2/coins/?limit=10';
const proxy_URL = 'https://cors-anywhere.herokuapp.com/';
const API_KEY = 'coinranking585697757ca1bf5a5bcfdda4e933f1f16afc413ef060abc8';

const LineChart = () => {

    const [chart, setChart] = useState([]);

    useEffect(()=>{
        const fetchCoins = async () => {
            await fetch(`${proxy_URL}${base_URL}`,{
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': `${API_KEY}`,
                    'Access-Control-Allow-Origin': '*'
                  },
            }).then((res) => {
                res.json().then( json => {
                    setChart(json.data);
                })
            }).catch( err => {
                console.log(err);
            });
        }

        // fetchCoins();
    },[]);
    
    const data = {
        labels: ['Jan', 'Feb', 'Mar', 'June', 'July'],
        datasets: [{
          fillColor:"gradient",
          fill: true,
          label: 'Dataset 2',
          data: [100, 300, 150, 250, 100],
          borderColor: 'rgb(53, 162, 235)',
          backgroundColor: 'rgba(53, 162, 235, 0.5)',
          borderWidth: 2,
          pointRadius:0,
          hoverPointRadius:0,
          tension:0.3
        }]
      };

      const changeTicksLabel = (value, index, values) => {
        console.log(value, index, values);
        // Calculate the midpoint between two grid lines
        if (index === 0) {
          return value; // Keep the first tick at its original position
        } else {
          const prevValue = values[index - 1];
          return (value + prevValue) / 2;
        }
      }

      const options = {
        layout:{
          padding: {
            left:16
          }
        },
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero:true,
            grid:{
              display:false,
              drawTicks:false,
              tickBorderDashOffset:0,
              tickBorderDash:[0, 0, 0, 0, 0]
            }
          },
          x: {
            // type: 'category', // Change position of ticks
            // position: 'bottom',
            ticks:{
              // labelOffset:100
              // align:'inner' // change alignment of ticks
              // callback: changeTicksLabel, // Customize tick labels text
              // maxRotation: 0, // Prevent label rotation
              // autoSkipPadding: 15,
              
            },
            // offset: true,
            grid:{
              // offset:true,
              drawTicks:false,
            }
          },
        },
        legend: {
            label: {
                fontSize : 26
            }
        },
      }

      const plugins = [{
        afterUpdate: (chart) => {
          calculateLabelOffset(chart); // change label text position
        },
      }]

      const calculateLabelOffset = (chart) => {
        if (chart) {
          console.log(chart);
          const xScale = chart.scales.x;
          const gridStepSize = xScale.getPixelForTick(1) - xScale.getPixelForTick(0); // Assuming evenly spaced ticks
          const newLabelOffset = gridStepSize / 2;
    
          // Update the x-axis ticks label offset
          xScale.options.ticks.labelOffset = newLabelOffset;
    
          // Redraw the chart
          // chart.update();
        }
      };

  return (
    <div /* style={{display:'flex', justifyContent:'center'}} */>
      <div /* style={{width:'800px'}} */>
        <Line
            height={400}
            data={data}
            options={options}
            plugins={plugins}
        />
      </div>
    </div>
  )
}

export default LineChart