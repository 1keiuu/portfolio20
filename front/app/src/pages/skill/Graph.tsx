import React from "react";
import { Line } from "react-chartjs-2";
import "../../styles/Graph.scss";
import GithubTitle from "../../components/GithubTitle";
import ArrowIcon from "../../components/ArrowIcon";
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
  monthlyArray: { labels: []; data: [] }[];
  currentWeeklyIndex: number;
  currentMonthlyIndex: number;
  currentMaxYAxis: number;
  maxYAxisGroup: { weekly: number; monthly: number; yearly: number };
}
const contributionsData = (labels: string[], data: number[], type: string) => {
  return {
    labels: labels,
    datasets: [
      {
        label: type,
        fill: true,
        lineTension: 0.1,
        backgroundColor: "rgb(47, 117, 98,0.4)",
        borderColor: "rgb(47, 117, 98,1)",
        borderCapStyle: "round",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "square",
        pointBorderColor: "rgb(47, 117, 98,1)",
        pointBackgroundColor: "#eee",
        pointBorderWidth: 10,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgb(47, 117, 98,1)",
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
    monthlyArray: [],
    currentWeeklyIndex: 0,
    currentMonthlyIndex: 0,
    currentMaxYAxis: 0,
    maxYAxisGroup: { weekly: 0, monthly: 0, yearly: 0 },
  };

  componentDidMount() {
    this.props.contributionsPromise.then((data) => {
      console.log(data);

      this.setState({
        weeklyArray: data.weekly.array,
        monthlyArray: data.monthly.array,
      });
      this.getWeeklyData(this.state.currentWeeklyIndex);
      this.getMonthlyData(this.state.currentMonthlyIndex);

      this.setState({
        yearlyData: contributionsData(
          data.yearly.labels,
          data.yearly.data,
          "yearly"
        ),
      });
      this.setState({
        currentMaxYAxis: data.weekly.max + 3,
      });
      // y軸の最大値を設定(+分はゆとり)
      this.setState({
        maxYAxisGroup: {
          weekly: data.weekly.max + 3,
          monthly: data.monthly.max + 40,
          yearly: data.yearly.max + 100,
        },
      });
      this.setState({ currentData: this.state.weeklyData });
    });
  }
  dataChange = (e: any) => {
    const val = e.target.value;
    switch (val) {
      case "week":
        this.setState({ currentData: this.state.weeklyData });
        this.setState({
          currentMaxYAxis: this.state.maxYAxisGroup.weekly,
        });
        break;
      case "month":
        this.setState({ currentData: this.state.monthlyData });
        this.setState({
          currentMaxYAxis: this.state.maxYAxisGroup.monthly,
        });

        break;
      case "year":
        this.setState({ currentData: this.state.yearlyData });
        this.setState({
          currentMaxYAxis: this.state.maxYAxisGroup.yearly,
        });

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
  getMonthlyData(index: number) {
    const contData = () => {
      return contributionsData(
        this.state.monthlyArray[index].labels,
        this.state.monthlyArray[index].data,
        "monthly"
      );
    };
    this.setState({ monthlyData: contData() });
  }
  async changeGraphSpan(n: number) {
    switch (this.state.currentData) {
      case this.state.weeklyData:
        await this.setState({
          currentWeeklyIndex: this.state.currentWeeklyIndex + n,
        });
        await this.getWeeklyData(this.state.currentWeeklyIndex);
        this.setState({ currentData: this.state.weeklyData });
        break;
      case this.state.monthlyData:
        await this.setState({
          currentMonthlyIndex: this.state.currentMonthlyIndex + n,
        });
        await this.getMonthlyData(this.state.currentMonthlyIndex);
        this.setState({ currentData: this.state.monthlyData });
        break;
    }
  }

  render() {
    return (
      <div className="graph">
        <div className="graph__upper">
          <div className="span-display__wrapper">
            <div className="prev-button">
              {(() => {
                if (this.state.currentData == this.state.yearlyData) return;
                if (this.state.currentData == this.state.weeklyData) {
                  // weekly
                  if (this.state.currentWeeklyIndex !== 3) {
                    return (
                      <div
                        onClick={async () => {
                          await this.changeGraphSpan(1);
                        }}
                        className="prev-arrow__wrapper"
                      >
                        <ArrowIcon isLeft={true} />
                      </div>
                    );
                  }
                } else {
                  if (
                    this.state.currentMonthlyIndex !==
                    this.state.monthlyArray.length - 1
                  ) {
                    return (
                      <div
                        onClick={async () => {
                          await this.changeGraphSpan(1);
                        }}
                        className="prev-arrow__wrapper"
                      >
                        <ArrowIcon isLeft={true} />
                      </div>
                    );
                  }
                }
              })()}
            </div>

            <div>
              <p>{this.culcSpan(this.state.currentData.labels)}</p>
            </div>
            <div className="next-button">
              {(() => {
                if (this.state.currentData == this.state.yearlyData) return;
                if (this.state.currentData == this.state.weeklyData) {
                  // weekly
                  if (this.state.currentWeeklyIndex !== 0) {
                    return (
                      <div
                        onClick={async () => {
                          await this.changeGraphSpan(-1);
                        }}
                        className="next-arrow__wrapper"
                      >
                        <ArrowIcon isLeft={false} />
                      </div>
                    );
                  }
                } else {
                  if (this.state.currentMonthlyIndex !== 0) {
                    return (
                      <div
                        onClick={async () => {
                          await this.changeGraphSpan(-1);
                        }}
                        className="next-arrow__wrapper"
                      >
                        <ArrowIcon isLeft={false} />
                      </div>
                    );
                  }
                }
              })()}
            </div>
          </div>
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
        <div className="line-graph__wrapper">
          <Line
            data={this.state.currentData}
            redraw={true}
            key={Math.random()}
            options={{
              scales: {
                yAxes: [
                  {
                    ticks: {
                      beginAtZero: true,
                      max: this.state.currentMaxYAxis,
                    },
                  },
                ],
              },
            }}
          />
        </div>
        <GithubTitle />
      </div>
    );
  }
}
