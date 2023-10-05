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

const RoundedDoughnutChart = () => {

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
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'June', 'July', 'Aug'],
        datasets: [{
          label: '# of Votes',
          data: [4, 2, 3, 4, 5, 18, 1],
          backgroundColor: [
            'red',
            'yellow',
            'blue',
            'green',
            'brown',
            'purple',
            'gray'
          ],
          borderColor: [
            'red',
            'yellow',
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
          // spacing:5, // set gap between chart portions
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
        },
        
      }

      const plugins= [{
        afterUpdate: function (chart) {
          if (chart.config.options.elements.arc.roundedCornersFor !== undefined) {
            const arcs = chart.getDatasetMeta(0).data;
            // console.log(chart);
            arcs.forEach(function(arc) {
              arc.round = {
                x: (chart.chartArea.left + chart.chartArea.right) / 2,
                y: (chart.chartArea.top + chart.chartArea.bottom) / 2,
                radius: (arc.outerRadius + arc.innerRadius) / 2,
                thickness: (arc.outerRadius - arc.innerRadius) / 2,
                backgroundColor: arc.options.backgroundColor
              }
            });
          }
        },
        
		afterDraw: function (chart) {
      if (chart.config.options.elements.arc.roundedCornersFor !== undefined) {
        const { ctx, canvas } = chart;

        chart.getDatasetMeta(0).data.forEach(arc => {
          const startAngle = Math.PI / 2 - arc.startAngle;
          const endAngle = Math.PI / 2 - arc.endAngle;

          ctx.save();
          ctx.translate(arc.round.x, arc.round.y);
          ctx.fillStyle = arc.options.backgroundColor;
          ctx.beginPath();
          ctx.arc(arc.round.radius * Math.sin(endAngle), arc.round.radius * Math.cos(endAngle), arc.round.thickness, 0, 2 * Math.PI);
          ctx.closePath();
          ctx.fill();
          ctx.restore();
        });
            const width = chart.width;
            const height = chart.height;
            const chartHeight = chart.chartArea.height;

            // console.log(chart);
      
            ctx.restore();
            let fontSize = (chart.width / 150).toFixed(2);

            ctx.font = (Math.min(fontSize, 1.5)) + "em sans-serif";
            ctx.textBaseline = "middle";
            ctx.fillStyle = chart.config.options.centerTextColor || "black";
      
            const text1 = "40%";
            const text2 = "Hardware failure";
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

export default RoundedDoughnutChart