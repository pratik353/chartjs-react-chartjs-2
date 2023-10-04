import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, CategoryScale,
    LinearScale, PointElement, LineElement, Title, Tooltip, Legend} from 'chart.js';
import {Line} from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
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
        label: '# of Votes',
        data: [4, 2, 6, 3, 5],
          backgroundColor: [
            '#49C354',
          ],
          borderColor: [
            '#49C354',
          ],
          borderWidth: 2,
          pointRadius:0,
          hoverPointRadius:0
        }]
      };

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
              drawTicks:false,
              tickBorderDashOffset:0,
              tickBorderDash:[0, 0, 0, 0, 0]
            }
          },
          x: {
            grid:{
              drawTicks:false,
            }
          }
        },
        legend: {
            label: {
                fontSize : 26
            }
        }
      }

  return (
    <div>
        <Line
            height={400}
            data={data}
            options={options}
        />
    </div>
  )
}

export default LineChart