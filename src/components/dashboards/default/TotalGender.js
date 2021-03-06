import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Badge, Card, Col, Row } from 'react-bootstrap';
import Flex from 'components/common/Flex';
import { getColor } from 'helpers/utils';
import * as echarts from 'echarts/core';
import { PieChart } from 'echarts/charts';
import Background from 'components/common/Background';
import bg3 from 'assets/img/icons/spot-illustrations/corner-3.png';

import {
  GridComponent,
  TooltipComponent,
  TitleComponent
} from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import BasicECharts from 'components/common/BasicEChart';

echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  PieChart,
  CanvasRenderer
]);

const getOptions = (data, radius) => ({
  color: [
    getColor(data[0].color),
    getColor(data[1].color)
  ],

  tooltip: {
    padding: [7, 10],
    transitionDuration: 0,
    backgroundColor: getColor('100'),
    borderColor: getColor('300'),
    textStyle: { color: getColor('dark') },
    borderWidth: 1,
    formatter: params =>
      `<strong>${params.data.name}:</strong> ${params.percent}%`
  },
  series: [
    {
      name: 'Users',
      type: 'pie',
      radius,
      avoidLabelOverlap: false,
      emphasis: {
        scale: false
      },
      itemStyle: {
        borderWidth: 2,
        borderColor: getColor('card-bg')
      },
      label: {
        show: true,
        position: 'center',
        formatter: '{a}',
        fontSize: 23,
        color: getColor('dark')
      },
      data
    }
  ]
});


const TotalGender = ({ data1, data, radius }) => {

  return (
    <Card className="h-md-100">
      <Background image={bg3} className="bg-card" />
      <Card.Body>
        <Row className="justify-content-between g-0">
          <Col xs={5} sm={6} xxl className="pe-2">
            <h6 className="mt-1">User Gender</h6>
            <Flex
              alignItems="center"
              justifyContent="between"
              className="fw-semi-bold fs--1 mt-3">
              <p className="mb-1">
                <FontAwesomeIcon
                  icon="circle"
                  className="me-2 text-primary"
                />
                Male
              </p>
              <Badge pill bg="200" className="text-primary fs--1">
              <div className="d-xxl-none"> { data1.male } </div>
             </Badge>
              
            </Flex>
            <Flex
              alignItems="center"
              justifyContent="between"
              className="fw-semi-bold fs--1"
            >
              <p className="mb-1">
                <FontAwesomeIcon
                  icon="circle"
                  className="me-2 text-info"
                />
                Female
              </p>
              <Badge pill bg="200" className="text-primary fs--1">
              <div className="d-xxl-none">{data1.female}</div>
             </Badge>
            </Flex>
          </Col>
          <Col xs="auto">
            <div className="ps-0">
              <BasicECharts
                echarts={echarts}
                options={getOptions(data, radius)}
                style={{ width: '6.625rem', height: '6.625rem' }}
              />
            </div>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default TotalGender;
