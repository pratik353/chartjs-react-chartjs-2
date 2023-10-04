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
          label: '# of Votes',
          data: [4, 3, 2],
          backgroundColor: [
            '#1363AC',
            '#49C354',
            '#9F97F7'
          ],
          borderWidth: 1
        },
        {
          label: '# of Votes',
          data: [1, 5, 3, 4],
          backgroundColor: [
            '#49C354',
            '#9F97F7',
            '#1363AC'
          ],
          borderWidth: 1
        },
        {
          label: '# of Votes',
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

export default BarChart