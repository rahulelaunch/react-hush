import React from 'react';
import { Row, Col } from 'react-bootstrap';

import StatisticsCards from './stats-cards/StatisticsCards';

const Dashboard = () => {
  return (
    <>
      <Row className="g-3 mb-3">
        <Col xxl={12}>
          <StatisticsCards />
          </Col>
      </Row>
    </>
  );
};

export default Dashboard;
