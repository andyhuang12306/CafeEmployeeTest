import React, { useEffect } from 'react'
import {
  ConfigProvider,
  Typography,
  Space,
} from 'antd'
import LayoutCom from './components/Layout'
import { getChartData } from './Api'
import { barOptions } from './Consts'
import { useDispatch, useSelector } from 'react-redux'
import { get } from './reducers/AppSlice'
import { Chart } from "react-google-charts"


function App() {
  const dispatch = useDispatch()
  const data = useSelector((state) => state.charts.data)

  useEffect(() => {
    getChartData(dispatch, get)
  }, [])

  return <ConfigProvider theme={{ token: { colorPrimary: '#00b96b', align: "middle" } }}>
    <LayoutCom>
      <Space size={50} direction='vertical'>
        <Typography.Title type="primary">Café Employee Management System Summary</Typography.Title>

        <Chart
          chartType="Bar"
          width="100%"
          height="400px"
          data={data.bar}
          options={barOptions}
        />

      </Space>
    </LayoutCom>
  </ConfigProvider>
}

export default App;