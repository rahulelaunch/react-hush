
import React, { useEffect, useState } from 'react';
import FalconComponentCard from 'components/common/FalconComponentCard';
import { chartJsDefaultTooltip } from 'helpers/chartjs-utils';
import { getColor, rgbaColor } from 'helpers/utils';
import PropTypes from 'prop-types';
import { Bar } from 'react-chartjs-2';
import ReactEChartsCore from 'echarts-for-react/lib/core';
import * as echarts from 'echarts/core';
import { tooltipFormatter } from 'helpers/echart-utils';


// const TotalUserChart = ({ data1 }) => {
//   console.log('data1');
//   // console.log(data1[0].users);
//   // let a = data.users;
// // const [mapData, setMapData] = useState([]);


// //   console.log('mapData');


//   const data = {
//     labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
//     datasets: [
//       {
//         label: '# of Users',

//         data: [,2],
//         backgroundColor: [
//           rgbaColor(getColor('secondary'), 0.2),
//           rgbaColor(getColor('warning'), 0.2),
//           rgbaColor(getColor('info'), 0.2),
//           rgbaColor(getColor('success'), 0.2),
//           rgbaColor(getColor('info'), 0.2),
//           rgbaColor(getColor('primary'), 0.2)
//         ],
//         borderColor: [
//           getColor('secondary'),
//           getColor('warning'),
//           getColor('info'),
//           getColor('success'),
//           getColor('info'),
//           getColor('primary')
//         ],
//         borderWidth: 1
//       }
//     ]
//   };

//   const options = {
//     plugins: {
//       tooltip: chartJsDefaultTooltip()
//     },
//     scales: {
//       x: {
//         grid: {
//           color: rgbaColor(getColor('black'), 0.1)
//         }
//       },
//       y: {
//         grid: {
//           color: rgbaColor(getColor('black'), 0.1),
//           drawBorder: true
//         }
//       }
//     }
//   };

//   return (
//     <FalconComponentCard>
//       <FalconComponentCard.Header title="Users Chart" light={false} />
//       <FalconComponentCard.Body>
//         <Bar
//           data={data}
//           options={options}
//           height={1000}
//           width={1618}
//         />
//       </FalconComponentCard.Body>
//     </FalconComponentCard>
//   );
// }



// // TotalUserChart.propTypes = {
// //   // data1: PropTypes.array.isRequired,
// //   data: PropTypes.string.isRequired,
// // };

// export default TotalUserChart;

const TotalUserChart = ({data1}) => {

  // console.log(data1.month);
  const months = data1.month;
  const data = data1.count;

  const getOption = () => ({
    tooltip: {
      trigger: 'axis',
      padding: [7, 10],
      backgroundColor: getColor('100'),
      borderColor: getColor('300'),
      textStyle: { color: getColor('dark') },
      borderWidth: 1,
      formatter: tooltipFormatter,
      transitionDuration: 0,
      axisPointer: {
        type: 'none'
      }
    },
    xAxis: {
      type: 'category',
      data: months,
      axisLine: {
        lineStyle: {
          color: getColor('300'),
          type: 'solid'
        }
      },
      axisTick: { show: false },
      axisLabel: {
        color: getColor('400'),
        formatter: value => value.substring(0, 3),
        margin: 15
      },
      splitLine: {
        show: false
      }
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        show: true,
        color: getColor('400'),
        margin: 15
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: getColor('200')
        }
      },
      axisTick: { show: false },
      axisLine: { show: false },
      min: 0
    },
    series: [
      {
        type: 'bar',
        name: 'Users',
        data,
        lineStyle: { color: getColor('primary') },
        itemStyle: {
          color: getColor('primary'),
          borderRadius: [3, 3, 0, 0]
        },
        showSymbol: false,
        symbol: 'circle',
        smooth: false,
        emphasis: {
          scale: true
        }
      }
    ],
    grid: { right: '3%', left: '10%', bottom: '10%', top: '5%' }
  });
  return (
    <FalconComponentCard>
      <FalconComponentCard.Header title="Users Chart" light={false} />
      <FalconComponentCard.Body>
        <ReactEChartsCore
          echarts={echarts}
          option={getOption()}
          style={{ height: '18.75rem' }}
        />
      </FalconComponentCard.Body>
    </FalconComponentCard>
  );
}

export default TotalUserChart;


