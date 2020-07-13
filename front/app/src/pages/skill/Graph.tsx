import React from "react";
import { Line } from "react-chartjs-2";
import "./style/Graph.scss";
import moment from "moment";

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
      label: "1年間のGitHub contribution",
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
const contributionsData = (labels: string[], data: number[]) => {
  return {
    labels: labels,
    datasets: [
      {
        label: "直近1週間のGitHub contribution",
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
    weeklyData: contributionsData([], []),
    monthlyData: contributionsData([], []),
    yearlyData: contributionsData([], []),
  };

  // getWeeklyData(data: []) {
  //   const today: object | undefined = data.find((d: { date: string }) => {
  //     return (
  //       d.date == moment(new Date()).subtract(1, "day").format("YYYY-MM-DD")
  //     );
  //   });
  //   if (today) {
  //     const todayIndex = data.indexOf(today);
  //     const LABELS = data
  //       .slice(todayIndex, todayIndex + 14)
  //       .map((d: { date: string }) => {
  //         return moment(d.date).format("MM/DD");
  //       })
  //       .reverse();
  //     const DATA = data
  //       .slice(todayIndex, todayIndex + 14)
  //       .map((d: { count: number }) => {
  //         return d.count;
  //       })
  //       .reverse();

  //     return { labels: LABELS, data: DATA };
  //   } else {
  //     return { labels: [], data: [] };
  //   }
  // }

  // getMonthlyData(data: []) {
  //   const today: {}[] | undefined = data.filter((d: { date: string }) => {
  //     return (
  //       d.date == moment(new Date()).subtract(1, "day").format("YYYY-MM-DD")
  //     );
  //   });
  //   console.log(data);
  //   data.forEach(() => {});
  // }

  componentDidMount() {
    this.props.contributionsPromise.then((data) => {
      console.log(data);
      this.setState({
        weeklyData: contributionsData(data.weekly.labels, data.weekly.data),
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
