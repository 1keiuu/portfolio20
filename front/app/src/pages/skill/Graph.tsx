import React from "react";
import { Line } from "react-chartjs-2";
import "./style/Graph.scss";
import GithubTitle from "../../shared/githubTitle/GithubTitle";
interface Props {
  contributionsPromise: Promise<any>;
}
interface State {
  currentData: {
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
  weeklyData: any;
  monthlyData: any;
  yearlyData: any;
  weeklyArray: { labels: []; data: [] }[];
  currentWeeklyIndex: number;
}
const contributionsData = (labels: string[], data: number[], type: string) => {
  return {
    labels: labels,
    datasets: [
      {
        label: type,
        fill: true,
        lineTension: 0.1,
        backgroundColor: "rgb(64, 196, 99,0.4)",
        borderColor: "rgb(64, 196, 99,1)",
        borderCapStyle: "round",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "square",
        pointBorderColor: "rgb(64, 196, 99,1)",
        pointBackgroundColor: "#eee",
        pointBorderWidth: 10,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgb(64, 196, 99,1)",
        pointHoverBorderColor: "rgba(220,220,220,1)",
        pointHoverBorderWidth: 1,
        pointRadius: 1,
        pointHitRadius: 10,
        data: data,
      },
    ],
    date: { first: labels[0], last: labels[labels.length - 1] },
  };
};
export default class Graph extends React.Component<Props, State> {
  state: State = {
    currentData: contributionsData([], [], "weekly"),
    weeklyData: contributionsData([], [], "weekly"),
    monthlyData: contributionsData([], [], "monthly"),
    yearlyData: contributionsData([], [], "yearly"),
    weeklyArray: [],
    currentWeeklyIndex: 0,
  };

  componentDidMount() {
    this.props.contributionsPromise.then((data) => {
      this.setState({
        weeklyArray: data.weekly,
      });
      this.getWeeklyData(this.state.currentWeeklyIndex);
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
      this.setState({ currentData: this.state.weeklyData });
    });
  }
  dataChange = (e: any) => {
    const val = e.target.value;
    switch (val) {
      case "week":
        this.setState({ currentData: this.state.weeklyData });
        break;
      case "month":
        this.setState({ currentData: this.state.monthlyData });
        break;
      case "year":
        this.setState({ currentData: this.state.yearlyData });
        break;
    }
  };
  culcSpan(labels: string[]) {
    return labels[0] + "~" + labels[labels.length - 1];
  }
  getWeeklyData(index: number) {
    const contData = () => {
      return contributionsData(
        this.state.weeklyArray[index].labels,
        this.state.weeklyArray[index].data,
        "weekly"
      );
    };
    this.setState({ weeklyData: contData() });
  }
  render() {
    return (
      <div className="graph">
        <div className="graph__upper">
          <GithubTitle />

          <select className="date-select" onChange={this.dataChange}>
            <option className="date-option" value="week">
              Week
            </option>
            <option className="date-option" value="month">
              Month
            </option>
            <option className="date-option" value="year">
              Year
            </option>
          </select>
        </div>
        <div>
          <p>{this.culcSpan(this.state.currentData.labels)}</p>
        </div>
        <p
          onClick={async () => {
            await this.setState({
              currentWeeklyIndex: this.state.currentWeeklyIndex - 1,
            });
            await this.getWeeklyData(this.state.currentWeeklyIndex);
            this.setState({ currentData: this.state.weeklyData });
          }}
        >
          next
        </p>
        <p
          onClick={async () => {
            await this.setState({
              currentWeeklyIndex: this.state.currentWeeklyIndex + 1,
            });
            await this.getWeeklyData(this.state.currentWeeklyIndex);
            this.setState({ currentData: this.state.weeklyData });
          }}
        >
          prev
        </p>
        {/* <div className="date-select">{this.state.currentData}</div> */}
        <Line data={this.state.currentData} redraw={true} key={Math.random()} />
      </div>
    );
  }
}
