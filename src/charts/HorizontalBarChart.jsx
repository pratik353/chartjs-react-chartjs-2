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

const BarChart = () => {

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
        labels: ['Jan', 'Feb', 'Mar'],
        datasets: [{
          label: ['server-1'],
          data: [4, 3, 2],
          backgroundColor: [
            '#1363AC',
            '#49C354',
            '#9F97F7'
          ],
          borderWidth: 1,
          barPercentage:0.3
        },
        {
          label: ['server-1'],
          data: [1, 5, 3],
          backgroundColor: [
            '#49C354',
            '#9F97F7',
            '#1363AC'
          ],
          borderWidth: 1
        },
        {
          label: ['server-1'],
          data: [3, 2, 1],
          backgroundColor: [
            '#9F97F7',
            '#1363AC',
            '#49C354',

          ],
          borderWidth: 1
        }]
      };

      const options = {
        layout:{
          padding: {
            right:24
          }
        },
        events: [], // removes all events fromm chart 
        indexAxis: "y",
        maintainAspectRatio: false,
        legend: {
            label: {
                fontSize : 26
            }
        },
        scales: {
          x: {
            grid: {
              // drawBorder: false,
              // display: false,
            },
            
            display: false
          },
          y: {
            ticks: {
              display: true,
            },
            grid:{
                drawBorder: false,
                display: false,
            },
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
        
                ctx.fillText(data+'k', bar.x, bar.y);
              });
            });
          }
        },
        plugins: {
          legend:{
            position:'bottom',
            labels:{
              usePointStyle: true, // create circular legends shape
              // pointStyle:'rect', // create rectangular legend shape
              pointStyle: 'rectRounded', // create rectangular rounded legend shape
            }
          }
        }
      }

  return (
    <div style={{display:'flex', justifyContent:'center'}}>
      <div >
        <Bar
            height={400}
            data={data}
            options={options}
        />
      </div>
    </div>
  )
}

export default BarChart