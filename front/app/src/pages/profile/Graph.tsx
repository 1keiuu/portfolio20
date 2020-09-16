import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import '../../styles/Graph.scss';
import ArrowIcon from '../../components/ArrowIcon';
interface Props {
  contributions: any;
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
  dailyData: any;
  monthlyData: any;
  yearlyData: any;
  dailyArray: { labels: []; counts: [] }[];
  monthlyArray: { labels: []; counts: [] }[];
  currentWeeklyIndex: number;
  currentMonthlyIndex: number;
  currentMaxYAxis: number;
  maxYAxisGroup: { daily: number; monthly: number; yearly: number };
}
const contributionsData = (
  labels: string[],
  counts: number[],
  type: string
) => {
  return {
    labels: labels,
    datasets: [
      {
        label: type,
        fill: true,
        lineTension: 0.1,
        backgroundColor: 'rgb(46, 128, 237,0.4)',
        borderColor: 'rgb(46, 128, 237,1)',
        borderCapStyle: 'round',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'square',
        pointBorderColor: 'rgb(46, 128, 237,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 10,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgb(220,220,220,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 1,
        pointRadius: 1,
        pointHitRadius: 10,
        data: counts,
      },
    ],
  };
};

const Graph: React.FC<Props> = (props) => {
  const [currentData, setCurrentData] = useState(
    contributionsData([], [], 'daily')
  );
  const [dailyData, setWeeklyData] = useState(
    contributionsData([], [], 'daily')
  );
  const [monthlyData, setMonthlyData] = useState(
    contributionsData([], [], 'monthly')
  );
  const [yearlyData, setYearlyData] = useState(
    contributionsData([], [], 'yearly')
  );
  const [dailyArray, setWeeklyArray] = useState<
    { labels: string[]; counts: number[] }[]
  >([]);
  const [monthlyArray, setMonthlyArray]: [
    { labels: []; counts: [] }[],
    React.Dispatch<React.SetStateAction<[]>>
  ] = useState([]);
  const [currentWeeklyIndex, setCurrentWeeklyIndex] = useState(0);
  const [currentMonthlyIndex, setCurrentMonthlyIndex] = useState(0);
  const [currentMaxYAxis, setCurrentMaxYAxis] = useState(0);
  const [maxYAxisGroup, setMaxYAxisGroup] = useState({
    daily: 0,
    monthly: 0,
    yearly: 0,
  });

  useEffect(() => {
    const data = props.contributions;

    if (data) {
      setWeeklyData(
        contributionsData(data.daily.labels[0], data.daily.counts[0], 'daily')
      );
      setMonthlyData(
        contributionsData(data.monthly.labels, data.monthly.counts, 'monthly')
      );
      setYearlyData(
        contributionsData(data.yearly.labels, data.yearly.counts, 'yearly')
      );
      const daily_array: { labels: string[]; counts: number[] }[] = [];
      data.daily.labels.forEach((label: string[], i: number) => {
        daily_array.push({ labels: label, counts: data.daily.counts[i] });
      });
      setWeeklyArray(daily_array);

      const culcMax = (countArray: number[][]) => {
        // 配列を連結
        let arr1: number[] = [];
        countArray.forEach((arr2) => {
          arr1 = arr1.concat(arr2);
        });
        // 降順にして1番目(最大)を返す
        const sortDesc = (a: number, b: number) => {
          return b - a;
        };
        return arr1.sort(sortDesc)[0];
      };

      if (data.daily.counts) {
        setCurrentMaxYAxis(culcMax(data.daily.counts) + 3);
        // y軸の最大値を設定(+分はゆとり)
        setMaxYAxisGroup({
          daily: culcMax(data.daily.counts) + 1,
          monthly: culcMax(data.monthly.counts) + 10,
          yearly: culcMax(data.yearly.counts) + 50,
        });
        setCurrentData(
          contributionsData(data.daily.labels[0], data.daily.counts[0], 'daily')
        );
      }
    }
  }, [props.contributions]);

  const dataChange = (e: any) => {
    const val = e.target.value;
    switch (val) {
      case 'day':
        setCurrentData(dailyData);
        setCurrentMaxYAxis(maxYAxisGroup.daily);
        break;
      case 'month':
        setCurrentData(monthlyData);
        setCurrentMaxYAxis(maxYAxisGroup.monthly);
        break;
      case 'year':
        setCurrentData(yearlyData);
        setCurrentMaxYAxis(maxYAxisGroup.yearly);

        break;
    }
  };
  const culcSpan = (labels: string[]) => {
    if (!labels) return;
    return labels[0] + ' ~ ' + labels[labels.length - 1];
  };
  const getWeeklyData = (index: number) => {
    const contData = () => {
      return contributionsData(
        dailyArray[index].labels,
        dailyArray[index].counts,
        'daily'
      );
    };
    setWeeklyData(contData());
    setCurrentData(contData());
  };
  const getMonthlyData = (index: number) => {
    const contData = () => {
      return contributionsData(
        monthlyArray[index].labels,
        monthlyArray[index].counts,
        'monthly'
      );
    };
    setMonthlyData(contData);
  };
  const changeGraphSpan = async (n: number) => {
    switch (currentData.labels) {
      case dailyData.labels:
        setCurrentWeeklyIndex(currentWeeklyIndex + n);
        getWeeklyData(currentWeeklyIndex + n);

        break;
      case monthlyData.labels:
        setCurrentMonthlyIndex(currentMonthlyIndex + n);
        getMonthlyData(currentMonthlyIndex);
        setCurrentData(monthlyData);
        break;
    }
  };

  return (
    <div className="graph">
      <div className="graph__upper">
        <div className="span-display__wrapper">
          <div className="prev-button">
            {(() => {
              if (currentData.labels !== dailyData.labels) return;
              if (currentData.labels === dailyData.labels) {
                // daily
                if (currentWeeklyIndex !== dailyArray.length - 1) {
                  return (
                    <div
                      onClick={async () => {
                        await changeGraphSpan(1);
                      }}
                      className="prev-arrow__wrapper"
                    >
                      <ArrowIcon isLeft={true} fill="#333" />
                    </div>
                  );
                }
              }
            })()}
          </div>

          <div className="graph__span-wrapper">
            <p className="graph__span">{culcSpan(currentData.labels)}</p>
          </div>
          <div className="next-button">
            {(() => {
              if (currentData === yearlyData) return;
              if (currentData.labels === dailyData.labels) {
                // daily
                if (currentWeeklyIndex !== 0) {
                  return (
                    <div
                      onClick={async () => {
                        await changeGraphSpan(-1);
                      }}
                      className="next-arrow__wrapper"
                    >
                      <ArrowIcon isLeft={false} fill="#333" />
                    </div>
                  );
                }
              } else {
                if (currentMonthlyIndex !== 0) {
                  return (
                    <div
                      onClick={async () => {
                        await changeGraphSpan(-1);
                      }}
                      className="next-arrow__wrapper"
                    >
                      <ArrowIcon isLeft={false} fill="#333" />
                    </div>
                  );
                }
              }
            })()}
          </div>
        </div>
        <select className="date-select" onChange={dataChange}>
          <option className="date-option" value="day">
            Day
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
          data={currentData}
          redraw={true}
          key={Math.random()}
          options={{
            scales: {
              yAxes: [
                {
                  ticks: {
                    beginAtZero: true,
                    max: currentMaxYAxis,
                  },
                },
              ],
            },
            maintainAspectRatio: false,
          }}
          width={window.parent.screen.width * 0.4}
          height={350}
        />
      </div>
    </div>
  );
};

export default Graph;
