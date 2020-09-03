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
  weeklyData: any;
  monthlyData: any;
  yearlyData: any;
  weeklyArray: { labels: []; counts: [] }[];
  monthlyArray: { labels: []; counts: [] }[];
  currentWeeklyIndex: number;
  currentMonthlyIndex: number;
  currentMaxYAxis: number;
  maxYAxisGroup: { weekly: number; monthly: number; yearly: number };
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
        backgroundColor: 'rgb(255, 255, 255,0.4)',
        borderColor: 'rgb(0, 0, 0,1)',
        borderCapStyle: 'round',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'square',
        pointBorderColor: 'rgb(0, 0, 0,1)',
        pointBackgroundColor: '#eee',
        pointBorderWidth: 10,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgb(0, 0, 0,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 1,
        pointRadius: 1,
        pointHitRadius: 10,
        data: counts,
      },
    ],
    // date: { first: labels[0], last: labels[labels.length - 1] },
  };
};

const Graph: React.FC<Props> = (props) => {
  const [currentData, setCurrentData] = useState(
    contributionsData([], [], 'weekly')
  );
  const [weeklyData, setWeeklyData] = useState(
    contributionsData([], [], 'weekly')
  );
  const [monthlyData, setMonthlyData] = useState(
    contributionsData([], [], 'monthly')
  );
  const [yearlyData, setYearlyData] = useState(
    contributionsData([], [], 'yearly')
  );
  const [weeklyArray, setWeeklyArray]: [
    { labels: []; counts: [] }[],
    React.Dispatch<React.SetStateAction<[]>>
  ] = useState([]);
  const [monthlyArray, setMonthlyArray]: [
    { labels: []; counts: [] }[],
    React.Dispatch<React.SetStateAction<[]>>
  ] = useState([]);
  const [currentWeeklyIndex, setCurrentWeeklyIndex] = useState(0);
  const [currentMonthlyIndex, setCurrentMonthlyIndex] = useState(0);
  const [currentMaxYAxis, setCurrentMaxYAxis] = useState(0);
  const [maxYAxisGroup, setMaxYAxisGroup] = useState({
    weekly: 0,
    monthly: 0,
    yearly: 0,
  });

  useEffect(() => {
    const data = props.contributions;

    if (data) {
      console.log(data);
      setWeeklyData(
        contributionsData(data.weekly.labels, data.weekly.counts, 'weekly')
      );
      setMonthlyData(
        contributionsData(data.monthly.labels, data.monthly.counts, 'monthly')
      );
      setYearlyData(
        contributionsData(data.yearly.labels, data.yearly.counts, 'yearly')
      );
      // setMonthlyData(data.monthly);
      // getWeeklyData(currentWeeklyIndex);
      // getMonthlyData(currentMonthlyIndex);
      // setYearlyData(
      //   contributionsData(data.yearly.labels, data.yearly.data, "yearly")
      // );

      const culcMax = (array: number[]) => {
        // 降順にして1番目(最大)を返す

        const sortDesc = (a: number, b: number) => {
          return b - a;
        };
        return array.sort(sortDesc)[0];
      };

      if (data.weekly.counts) {
        setCurrentMaxYAxis(culcMax(data.weekly.counts) + 3);
        // y軸の最大値を設定(+分はゆとり)
        setMaxYAxisGroup({
          weekly: culcMax(data.weekly.counts) + 3,
          monthly: culcMax(data.monthly.counts) + 40,
          yearly: culcMax(data.yearly.counts) + 100,
        });
        setCurrentData(
          contributionsData(data.weekly.labels, data.weekly.counts, 'weekly')
        );
      }
    }
  }, [props.contributions]);

  const dataChange = (e: any) => {
    const val = e.target.value;
    switch (val) {
      case 'week':
        setCurrentData(weeklyData);
        setCurrentMaxYAxis(maxYAxisGroup.weekly);
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
    return labels[0] + '~' + labels[labels.length - 1];
  };
  const getWeeklyData = (index: number) => {
    const contData = () => {
      return contributionsData(
        weeklyArray[0].labels,
        weeklyArray[0].counts,
        'weekly'
      );
    };
    setWeeklyData(contData());
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
    switch (currentData) {
      case weeklyData:
        await setCurrentWeeklyIndex(currentWeeklyIndex + n);
        await getWeeklyData(currentWeeklyIndex);
        setCurrentData(weeklyData);
        break;
      case monthlyData:
        await setCurrentMonthlyIndex(currentMonthlyIndex + n);
        await getMonthlyData(currentMonthlyIndex);
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
              if (currentData === yearlyData) return;
              if (currentData === weeklyData) {
                // weekly
                if (currentWeeklyIndex !== 3) {
                  return (
                    <div
                      onClick={async () => {
                        await changeGraphSpan(1);
                      }}
                      className="prev-arrow__wrapper"
                    >
                      <ArrowIcon isLeft={true} fill="#093e49" />
                    </div>
                  );
                }
              } else {
                if (currentMonthlyIndex !== monthlyArray.length - 1) {
                  return (
                    <div
                      onClick={async () => {
                        await changeGraphSpan(1);
                      }}
                      className="prev-arrow__wrapper"
                    >
                      <ArrowIcon isLeft={true} fill="#093e49" />
                    </div>
                  );
                }
              }
            })()}
          </div>

          <div>
            <p className="graph__span">{culcSpan(currentData.labels)}</p>
            <button
              onClick={() => {
                console.log(currentData);
              }}
            >
              culc
            </button>
          </div>
          <div className="next-button">
            {(() => {
              if (currentData === yearlyData) return;
              if (currentData === weeklyData) {
                // weekly
                if (currentWeeklyIndex !== 0) {
                  return (
                    <div
                      onClick={async () => {
                        await changeGraphSpan(-1);
                      }}
                      className="next-arrow__wrapper"
                    >
                      <ArrowIcon isLeft={false} fill="#093e49" />
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
                      <ArrowIcon isLeft={false} fill="#093e49" />
                    </div>
                  );
                }
              }
            })()}
          </div>
        </div>
        <select className="date-select" onChange={dataChange}>
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
