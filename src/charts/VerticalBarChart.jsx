import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, BarElement, LinearScale, CategoryScale} from 'chart.js';
import {Bar} from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement
)

const base_URL = 'https://api.coinranking.com/v2/coins/?limit=10';
const proxy_URL = 'https://cors-anywhere.herokuapp.com/';
const API_KEY = 'coinranking585697757ca1bf5a5bcfdda4e933f1f16afc413ef060abc8';

const VerticalBarChart = () => {

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
          label: '# of Votes',
          data: [4, 3, 2, 4, 5],
          backgroundColor: [
            '#1363AC',
            '#49C354',
            '#9F97F7'
          ],
          borderWidth: 1
        }]
      };

      const options = {
        maintainAspectRatio: false,
        scales: {
          x: {
            grid: {
                // drawBorder: false,
                display: true,
                color:'red',
                lineWidth:0,
                // drawOnChartArea:false
            },
            display: false
          },
          y: {

            // ticks styling
            ticks: {
              display: true,
            },

            // grid lines styling
            grid:{
                // drawOnChartArea:false,
                color:'green',
                lineWidth:0,
                // drawBorder: false,
                // display: false,
            },

            // axis border styling
            border:{
                display:false
            },
          },

        },
        animation: {
            duration: 1,
            onComplete: function({ chart }) {
              const ctx = chart.ctx;
          
              chart.config.data.datasets.forEach(function(dataset, i) {
                const meta = chart.getDatasetMeta(i);

                meta.data.forEach(function(bar, index) {
                  const data = dataset.data[index];
          
                  ctx.fillText(data, bar.x, bar.y - 5);
                });
              });
            }
          }
      }

  return (
    <div>
        <Bar
            height={400}
            data={data}
            options={options}
        />
    </div>
  )
}

export default VerticalBarChart