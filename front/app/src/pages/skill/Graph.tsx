import React from "react";
import { Line } from "react-chartjs-2";
import "./style/Graph.scss";

interface Props {
  contributionsPromise: Promise<any>;
}
interface State {
  data: object;
  weeklyData: {
    labels: string[];
    datasets: {
      label: string;
      fill: boolean;
      lineTension: number;
      backgroundColor: string;
      borderColor: string;
      borderCapStyle: string;
      borderDash: never[];
      borderDashOffset: number;
      borderJoinStyle: string;
      pointBorderColor: string;
      pointBackgroundColor: string;
      pointBorderWidth: number;
      pointHoverRadius: number;
      pointHoverBackgroundColor: string;
      pointHoverBorderColor: string;
      pointHoverBorderWidth: number;
      pointRadius: number;
      pointHitRadius: number;
      data: any;
    }[];
  };
  monthlyData: object;
  yearlyData: object;
}
const contributionsData = (labels: string[], data: number[], type: string) => {
  return {
    labels: labels,
    datasets: [
      {
        label: type,
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
        data: data,
      },
    ],
  };
};
export default class Graph extends React.Component<Props, State> {
  state: State = {
    data: {},
    weeklyData: contributionsData([], [], "weekly"),
    monthlyData: contributionsData([], [], "monthly"),
    yearlyData: contributionsData([], [], "yearly"),
  };

  componentDidMount() {
    this.props.contributionsPromise.then((data) => {
      console.log(data);
      this.setState({
        weeklyData: contributionsData(
          data.weekly.labels,
          data.weekly.data,
          "weekly"
        ),
      });
      this.setState({
        monthlyData: contributionsData(
          data.monthly.labels,
          data.monthly.data,
          "monthly"
        ),
      });
      this.setState({
        yearlyData: contributionsData(
          data.yearly.labels,
          data.yearly.data,
          "yearly"
        ),
      });
      this.setState({ data: this.state.weeklyData });
    });
  }
  dataChange = (e: any) => {
    const val = e.target.value;
    switch (val) {
      case "week":
        this.setState({ data: this.state.weeklyData });
        break;
      case "month":
        this.setState({ data: this.state.monthlyData });
        break;
      case "year":
        this.setState({ data: this.state.yearlyData });
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
