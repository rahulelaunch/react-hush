// import React from 'react';
// import PropTypes from 'prop-types';
// import FalconCardHeader from 'components/common/FalconCardHeader';
// import FalconComponentCard from 'components/common/FalconComponentCard';
// import CardDropdown from 'components/common/CardDropdown';
// import { Button, Card } from 'react-bootstrap';
// import { Link } from 'react-router-dom';
// import Flex from 'components/common/Flex';
// import { getColor } from 'helpers/utils';
// import * as echarts from 'echarts/core';
// import ReactEChartsCore from 'echarts-for-react/lib/core';
// import { BarChart } from 'echarts/charts';
// import {
//   GridComponent,
//   TooltipComponent,
//   TitleComponent,
//   DatasetComponent,
//   LegendComponent
// } from 'echarts/components';
// import { CanvasRenderer } from 'echarts/renderers';

// echarts.use([
//   TitleComponent,
//   TooltipComponent,
//   GridComponent,
//   BarChart,
//   CanvasRenderer,
//   LegendComponent,
//   DatasetComponent
// ]);

// const getOption = data => ({
//   color: [getColor('primary'), getColor('300')],
//   dataset: { source: data },
//   tooltip: {
//     trigger: 'item',
//     padding: [7, 10],
//     backgroundColor: getColor('100'),
//     borderColor: getColor('300'),
//     textStyle: { color: getColor('dark') },
//     borderWidth: 1,
//     transitionDuration: 0,
//     formatter: function (params) {
//       return `<div className="fw-semi-bold">${
//         params.seriesName
//       }</div><div className="fs--1 text-600"><strong>${params.name}:</strong> ${
//         params.value[params.componentIndex + 1]
//       }</div>`;
//     }
//   },
//   legend: {
//     data: ['2019', '2018'],
//     left: 'left',
//     itemWidth: 10,
//     itemHeight: 10,
//     borderRadius: 0,
//     icon: 'circle',
//     inactiveColor: getColor('400'),
//     textStyle: { color: getColor('700') }
//   },
//   xAxis: {
//     type: 'category',
//     axisLabel: { color: getColor('400') },
//     axisLine: {
//       lineStyle: {
//         color: getColor('300'),
//         type: 'dashed'
//       }
//     },
//     axisTick: false,
//     boundaryGap: true
//   },
//   yAxis: {
//     axisPointer: { type: 'none' },
//     axisTick: 'none',
//     splitLine: {
//       lineStyle: {
//         color: getColor('300'),
//         type: 'dashed'
//       }
//     },
//     axisLine: { show: false },
//     axisLabel: { color: getColor('400') }
//   },
//   series: [
//     {
//       type: 'bar',
//       barWidth: '10px',
//       barGap: '30%',
//       label: { show: false },
//       z: 10,
//       itemStyle: {
//         borderRadius: [10, 10, 0, 0],
//         color: getColor('primary')
//       }
//     },
//     {
//       type: 'bar',
//       barWidth: '10px',
//       barGap: '30%',
//       label: { show: false },
//       itemStyle: {
//         borderRadius: [10, 10, 0, 0],
//         color: getColor('300')
//       }
//     }
//   ],
//   grid: { right: '0', left: '30px', bottom: '10%', top: '20%' }
// });

// const TopProducts = ({ data }) => {
//   return (
//     <FalconComponentCard>
//     <FalconComponentCard.Header title="Users" light={false} />

//     <FalconComponentCard.Body>
//         <ReactEChartsCore
//           echarts={echarts}
//           option={getOption(data)}
//           height={1000} 
//           width={1618}
//         />
//       </FalconComponentCard.Body>
//     </FalconComponentCard>
//   );
// };

// TopProducts.propTypes = {
//   data: PropTypes.array.isRequired
// };

// export default TopProducts;


// function TopProducts() {

//   const getOption = () => ({
//     color: [getColor('primary'), getColor('info')],
//       tooltip: {
//         trigger: 'axis',
//         axisPointer: {
//           type: 'shadow'
//         },
//         padding: [7, 10],
//         backgroundColor: getColor('100'),
//         borderColor: getColor('300'),
//         textStyle: { color: getColor('dark') },
//         borderWidth: 1,
//         transitionDuration: 0,
//         // formatter: tooltipFormatter
//       },
//       yAxis: {
//         type: 'value',
//         axisLabel: {
//           formatter: value => value / 1000+'k',
//           color: getColor('500')
//         },
//         axisLine: {
//           show: true,
//           lineStyle: {
//             color: getColor('300'),
//             type: 'solid'
//           }
//         },
//         splitLine: {
//           lineStyle: {
//             type: 'dashed',
//             color: getColor('200')
//           }
//         }
//       },
//       xAxis: {
//         type: 'category',
//         axisLine: {
//           show: true,
//           lineStyle: {
//             color: getColor('300'),
//             type: 'solid'
//           }
//         },
//         axisLabel: {
//           color: getColor('500')
//         },
//         axisTick: { show: false },
//         splitLine: { show: false },
//         data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun','July','Aug','Sept','Oct','Nov','Dec']
//       },
//       series: [
//         {
//           name: '2011',
//           type: 'bar',
//           data: [11, 44, 33, 43, 22],
//           itemStyle: {
//             borderRadius: [0, 3, 3, 0]
//           }
//         },
//         {
//           name: '2012',
//           type: 'bar',
//           data: [33, 11, 17, 22, 11],
//           itemStyle: {
//             borderRadius: [0, 3, 3, 0]
//           }
//         }
//       ],
//       grid: { right: 15, left: '12%', bottom: '10%', top: 5 }
//     });

//     return (
//       <FalconComponentCard>
//         <FalconComponentCard.Header title="Users Chart" light={false} />
//         <FalconComponentCard.Body>
//         <ReactEChartsCore
//         echarts={echarts}
//         option={getOption()}
//         style={{ minHeight: '18.75rem' }}
//       />
//       </FalconComponentCard.Body>
//       </FalconComponentCard>
//     );

//   }

//   export default TopProducts;


import FalconComponentCard from 'components/common/FalconComponentCard';
import { chartJsDefaultTooltip } from 'helpers/chartjs-utils';
import { getColor, rgbaColor } from 'helpers/utils';
import React from 'react';
import { Bar } from 'react-chartjs-2';

const TotalSales = ( {data1} ) =>{
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun','July','Aug','Sept','Oct','Nov','Dec'],
    datasets: [
      {
        label: '# of Users',

     series: [
        {
          name: '2011',
          type: 'bar',
          data: [11, 44, 33, 43, 22],
          itemStyle: {
            borderRadius: [0, 3, 3, 0]
          }
        },
        {
          name: '2012',
          type: 'bar',
          data: [33, 11, 17, 22, 11],
          itemStyle: {
            borderRadius: [0, 3, 3, 0]
          }
        }
      ],
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          rgbaColor(getColor('secondary'), 0.2),
          rgbaColor(getColor('warning'), 0.2),
          rgbaColor(getColor('info'), 0.2),
          rgbaColor(getColor('success'), 0.2),
          rgbaColor(getColor('info'), 0.2),
          rgbaColor(getColor('primary'), 0.2)
        ],
        borderColor: [
          getColor('secondary'),
          getColor('warning'),
          getColor('info'),
          getColor('success'),
          getColor('info'),
          getColor('primary')
        ],
        borderWidth: 1
      }
    ]
  };

  const options = {
    plugins: {
      tooltip: chartJsDefaultTooltip()
    },
    scales: {
      x: {
        grid: {
          color: rgbaColor(getColor('black'), 0.1)
        }
      },
      y: {
        grid: {
          color: rgbaColor(getColor('black'), 0.1),
          drawBorder: true
        }
      }
    }
  };

    return (
      <FalconComponentCard>
        <FalconComponentCard.Header title="Gender Chart" light={false} />
        <FalconComponentCard.Body>
      <Bar 
        data={data} 
        options={options} 
        height={1000} 
        width={1618}
      />
      </FalconComponentCard.Body>
      </FalconComponentCard>
    );
  }



export default TotalSales;

