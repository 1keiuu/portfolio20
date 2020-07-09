import React from "react";
import { Line } from "react-chartjs-2";
import "./style/Graph.scss";

const weeklyData = {
  labels: ["7/7", "7/6", "7/5", "7/4", "7/3", "7/2", "7/1"],
  datasets: [
    {
      label: "My First dataset",
      fill: true,
      lineTension: 0.1,
      backgroundColor: "rgba(75,192,192,0.4)",
      borderColor: "rgba(75,192,192,1)",
      borderCapStyle: "round",
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: "square",
      pointBorderColor: "rgba(75,192,192,1)",
      pointBackgroundColor: "#eee",
      pointBorderWidth: 10,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: "rgba(75,192,192,1)",
      pointHoverBorderColor: "rgba(220,220,220,1)",
      pointHoverBorderWidth: 1,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [3, 10, 21, 31, 34, 40, 48],
    },
  ],
};
const monthlyData = {
  labels: ["7月", "6月", "5月", "4月", "3月", "2月", "1月"],
  datasets: [
    {
      label: "My First dataset",
      fill: true,
      lineTension: 0.1,
      backgroundColor: "rgba(75,192,192,0.4)",
      borderColor: "rgba(75,192,192,1)",
      borderCapStyle: "round",
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: "square",
      pointBorderColor: "rgba(75,192,192,1)",
      pointBackgroundColor: "#eee",
      pointBorderWidth: 10,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: "rgba(75,192,192,1)",
      pointHoverBorderColor: "rgba(220,220,220,1)",
      pointHoverBorderWidth: 1,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [30, 40, 218, 341, 134, 240, 48],
    },
  ],
};
const yearlyData = {
  labels: ["2020", "2019", "2018", "2017", "2016", "2015", "2014"],
  datasets: [
    {
      label: "My First dataset",
      fill: true,
      lineTension: 0.1,
      backgroundColor: "rgba(75,192,192,0.4)",
      borderColor: "rgba(75,192,192,1)",
      borderCapStyle: "round",
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: "square",
      pointBorderColor: "rgba(75,192,192,1)",
      pointBackgroundColor: "#eee",
      pointBorderWidth: 10,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: "rgba(75,192,192,1)",
      pointHoverBorderColor: "rgba(220,220,220,1)",
      pointHoverBorderWidth: 1,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [3000, 4000, 218],
    },
  ],
};
interface Props {}
interface State {
  data: object;
}
export default class Graph extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      data: {},
    };
  }
  componentDidMount() {
    this.setState({ data: weeklyData });
  }
  dataChange = (e: any) => {
    const val = e.target.value;
    console.log(this.state);
    switch (val) {
      case "week":
        this.setState({ data: weeklyData });
        break;
      case "month":
        this.setState({ data: monthlyData });
        break;
      case "year":
        this.setState({ data: yearlyData });
        break;
    }
  };
  render() {
    return (
      <div className="graph">
        <select onChange={this.dataChange}>
          <option value="week">Week</option>
          <option value="month">Month</option>
          <option value="year">Year</option>
        </select>
        <Line data={this.state.data} redraw={true} />
      </div>
    );
  }
}
