import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Card, Tooltip, OverlayTrigger } from 'react-bootstrap';
import Flex from 'components/common/Flex';
import { getColor } from 'helpers/utils';
import * as echarts from 'echarts/core';
import { BarChart } from 'echarts/charts';
import Background from 'components/common/Background';
import bg1 from 'assets/img/icons/spot-illustrations/corner-1.png';
import {
  GridComponent,
  TooltipComponent,
  TitleComponent
} from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import BasicECharts from 'components/common/BasicEChart';
import SoftBadge from 'components/common/SoftBadge';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  BarChart,
  CanvasRenderer
]);

const getOptions = data => ({
  xAxis: {
    type: 'category',
    data: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    boundaryGap: false,
    axisLine: { show: false },
    axisLabel: { show: false },
    axisTick: { show: false },
    axisPointer: { type: 'none' }
  },
  yAxis: {
    type: 'value',
    splitLine: { show: false },
    axisLine: { show: false },
    axisLabel: { show: false },
    axisTick: { show: false },
    axisPointer: { type: 'none' }
  },
  series: [
    {
      type: 'bar',
      showBackground: true,
      backgroundStyle: {
        borderRadius: 10
      },
      barWidth: '5px',
      itemStyle: {
        borderRadius: 10,
        color: getColor('primary')
      },
      data,
      z: 10
    }
  ],
  grid: { right: 5, left: 10, top: 0, bottom: 0 }
});

const TotalPlan = ({ data, width, amountClassName, data1 }) => {
  return (
    <Card className="h-md-100">
      {/* <Background image={bg1} className="bg-card" /> */}
      <Card.Header className="pb-0">
        <h6 className="mb-0 mt-2">
          Total Plan
        </h6>
      </Card.Header>

      <Card.Body as={Flex} alignItems="end" justifyContent="between">
        <div>
          <h2
            className={classNames(
              amountClassName,
              'mb-1 text-700 fw-normal lh-1'
            )}
          >
            {data1}
          </h2>
          <SoftBadge pill bg="success" className="me-2 fs--2">
            <Link to="/admin/plan/list" >See All</Link>
          </SoftBadge>
        </div>
        <BasicECharts
          echarts={echarts}
          options={getOptions(data)}
          style={{ width: width || '8.5rem', height: 60 }}
        />
      </Card.Body>
    </Card>
  );
};

TotalPlan.propTypes = {
  data: PropTypes.array.isRequired,
  data1: PropTypes.number.isRequired,
  width: PropTypes.string,
  amountClassName: PropTypes.string
};

export default TotalPlan;
