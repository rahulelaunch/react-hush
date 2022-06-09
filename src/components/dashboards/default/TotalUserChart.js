
import React from 'react';
import FalconComponentCard from 'components/common/FalconComponentCard';
import { getColor } from 'helpers/utils';
import ReactEChartsCore from 'echarts-for-react/lib/core';
import * as echarts from 'echarts/core';
import { tooltipFormatter } from 'helpers/echart-utils';

const TotalUserChart = ({data1}) => {
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


