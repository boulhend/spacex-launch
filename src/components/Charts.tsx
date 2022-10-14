import { useState, useEffect } from 'react';
import { LaunchSiteStatusData } from '../types/launch';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

type Props = {
  data: LaunchSiteStatusData;
};
const Charts = ({ data }: Props) => {
  const [chart, setChart] = useState<string>();
  const windowWidth = window?.innerWidth;
  let chartData;
  if (chart) {
    chartData = data[chart];
  }

  const options = {
    chart: {
      type: 'column',
      height: 500,
      //This is a hack because there is some issues with responsive object
      width: windowWidth < 700 ? windowWidth - 50 : undefined,
    },
    title: {
      text: `${chart} Launch Statuses`,
      style: { color: '#333333', fontSize: '1.2rem', fontWeight: 'bold' },
    },
    xAxis: {
      categories: ['Launches'],
      crosshair: true,
    },
    yAxis: {
      title: {
        text: 'Number Of Launches',
      },
    },
    tooltip: {
      headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
      pointFormat:
        '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
        '<td style="padding:0"><b>{point.y:.1f}</b></td></tr>',
      footerFormat: '</table>',
      shared: false,
      useHTML: true,
    },
    plotOptions: {
      column: {
        pointPadding: 0,
        borderWidth: 0,
      },
    },
    series: [
      {
        name: 'Success Launches',
        data: [chartData?.successLaunches],
        color: '#3b82f6',
      },
      {
        name: 'Failed Launches',
        data: [chartData?.failedLaunches],
        color: '#ef4444',
      },
    ],
  };

  return (
    <main className="flex flex-col items-center bg-gray-50 min-h-screen py-16">
      <h1 className="text-4xl text-blue-800 font-bold mb-10 text-center capitalize">
        SpaceX launch sites
      </h1>

      <label htmlFor="launches" className="text-xl text-center font-bold mb-7">
        Select which launch site to show :{' '}
      </label>
      <select
        onChange={(e) => setChart(e.target.value)}
        name="launches"
        id="launches"
        className=" bg-white truncate border-2 rounded p-3 active:border-blue-500 focus:border-blue-500 focus:outline-none mb-2"
      >
        <option value={undefined}>-</option>
        {Object.keys(data).map((launch) => (
          <option key={launch} value={launch} className="text-base">
            {launch}
          </option>
        ))}
      </select>
      {chartData && (
        <div className="mt-7 self-center">
          <HighchartsReact highcharts={Highcharts} options={options} key={chart} />
        </div>
      )}
    </main>
  );
};

export default Charts;
