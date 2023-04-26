import React, { useEffect, useState } from 'react';
import {
    Chart as ChartJS,
    LinearScale,
    CategoryScale,
    BarElement,
    PointElement,
    LineElement,
    Legend,
    Tooltip,
    LineController,
    BarController
  } from "chart.js";import {Chart} from 'react-chartjs-2';

ChartJS.register(
    LinearScale,
    CategoryScale,
    BarElement,
    PointElement,
    LineElement,
    Legend,
    Tooltip,
    LineController,
    BarController
)

const base_URL = 'https://api.coinranking.com/v2/coins/?limit=10';
const proxy_URL = 'https://cors-anywhere.herokuapp.com/';
const API_KEY = 'coinranking585697757ca1bf5a5bcfdda4e933f1f16afc413ef060abc8';

const labels = ["January", "February", "March", "April", "May", "June", "July"];


const MultiTypeChart = () => {

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

        fetchCoins();
    },[]);
    
    const data = {
        labels: labels,
        datasets: [
            {
                label: '# of Votes',
                data: chart?.coins?.map( coin => coin.price),
                backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(255, 159, 64, 0.2)',
                  'rgba(255, 205, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(201, 203, 207, 0.2)'
                ],
                borderColor: [
                  'rgb(255, 99, 132)',
                  'rgb(255, 159, 64)',
                  'rgb(255, 205, 86)',
                  'rgb(75, 192, 192)',
                  'rgb(54, 162, 235)',
                  'rgb(153, 102, 255)',
                  'rgb(201, 203, 207)'
                ],
                borderWidth: 1
            },
            {
                type: "line",
                label: "Use Case Invoke Count",
                borderColor: "rgb(255, 99, 132)",
                borderWidth: 2,
                fill: false,
                data: labels.map(() =>Math.floor(Math.random() * 30000))
            },
        ]
      };

      const options = {
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true
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
        <Chart
            type='bar'
            height={400}
            data={data}
            options={options}
        />
    </div>
  )
}

export default MultiTypeChart