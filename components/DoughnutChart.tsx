'use client'
import React from 'react'
import { Doughnut } from 'react-chartjs-2';
import {Chart, ArcElement} from 'chart.js'

Chart.register(ArcElement)

const DoughnutChart = ({accounts}: DoughnutChartProps) => {
  const data = {
    datasets: [
      {
        label: 'Banks',
        data: [1234, 1234, 1234],
        backgroundColor: ['#0747b6', '#2265d8', '#2f91fa'] 
      }
    ],
    labels: ['accountNames', 'BANCO', 'E MAIS UM']
  }
  return (
      <Doughnut data={data} options={{
        cutout: '60%',
     

      }} />
  )
}

export default DoughnutChart