import { Chart } from "react-google-charts"

export const BarChart = (props) => {

    return <Chart
            chartType="Bar"
            width="100%"
            height="400px"
            data={props.data}
            options={props.options}
        />
}