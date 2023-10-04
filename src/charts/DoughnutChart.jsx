import React, { useEffect, useState } from 'react';
import { 
  Chart as ChartJS, ArcElement, Tooltip, Legend,
  Plugin as ChartJSPlugin
} from 'chart.js';
import {Doughnut} from 'react-chartjs-2';

ChartJS.register(
    Legend,
    Tooltip,
    ArcElement
)

const base_URL = 'https://api.coinranking.com/v2/coins/?limit=10';
const proxy_URL = 'https://cors-anywhere.herokuapp.com/';
const API_KEY = 'coinranking585697757ca1bf5a5bcfdda4e933f1f16afc413ef060abc8';

const DoughnutChart = () => {

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
        // labels: chart?.coins?.map( coin => coin.name),
        // datasets: [{
        //   label: '# of Votes',
        //   data: chart?.coins?.map( coin => coin.price),
        labels: ['Jan', 'Feb'],
        datasets: [{
          label: '# of Votes',
          data: [4, 2],
          backgroundColor: [
            '#49C354',
            '#9F97F7',
            'blue',
            'green',
            'brown',
            'purple',
            'gray'
          ],
          borderColor: [
            '#49C354',
            '#9F97F7',
            'blue',
            'green',
            'brown',
            'purple',
            'gray'
          ],
          borderWidth: 1,
          cutout: '85%', // set width of chart 
          // borderRadius: 10,
          // radius:150 // set radius of chart
          spacing:5, // set gap between chart portions
          rotation:40, // rotate chart
          // offset: 100s
          // circumference: 1
        }]
      };

      const options = {
        maintainAspectRatio: false,
        // BELOW CODE ADD SCALE/GRID LINES IN CHART
        // scales: {
        //   y: {
        //     beginAtZero: true
        //   }
        // },
        elements: {
          arc: { 
            roundedCornersFor: 0
          },
        },
        plugins:{
          tooltip: {
            // Set the desired z-index value
            // titleColor: 'red',
          },
          legend: {
            onClick: null // remove onClick event from legend,
        },
        }
      }

      const plugins= [{
		afterDraw: function (chart) {
      if (chart.config.options.elements.arc.roundedCornersFor !== undefined) {
        const { ctx, canvas } = chart;

            const width = chart.width;
            const height = chart.height;
            const chartHeight = chart.chartArea.height;

            // console.log(chart);
      
            ctx.restore();
            const fontSize = 1.5;
            ctx.font = fontSize + "em sans-serif";
            ctx.textBaseline = "middle";
            ctx.fillStyle = chart.config.options.centerTextColor || "black";
      
            const text1 = "70%";
            const text2 = "Approved";
            const textX = Math.round((width - ctx.measureText(text1).width) / 2);
            const textX2 = Math.round((width - ctx.measureText(text2).width) / 2);
            const textY = (height - (chartHeight / 2));

            ctx.fillText(text1, textX, textY);
            ctx.fillText(text2, textX2, textY+25);
            ctx.save();
			  }
		  },
      }]

  return (
    <div>
        <Doughnut
            height={300}
            data={data}
            options={options}
            plugins={plugins} 
        />
    </div>
  )
}

export default DoughnutChart