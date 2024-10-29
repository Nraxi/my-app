import React from 'react'
import BlockChart from '../components/Charts/BlockChart'
import LineChart from '../components/Charts/LineChart'
import PieCharts from '../components/Charts/PieCharts'

function Chart() {
  return (
    <div>Chart

      <BlockChart />
      <LineChart />
      <PieCharts />
    </div>
  )
}

export default Chart