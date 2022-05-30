import React from 'react';
import WeeklySales from './WeeklySales';
import { Row, Col } from 'react-bootstrap';

import StatisticsCards from '../saas/stats-cards/StatisticsCards';
import TotalOrder from './TotalOrder';
import MarketShare from './MarketShare';
import TotalSales from './TotalSales';
import RunningProjects from './RunningProjects';
import StorageStatus from './StorageStatus';
import SpaceWarning from './SpaceWarning';
import BestSellingProducts from './BestSellingProducts';
import SharedFiles from './SharedFiles';
import ActiveUsers from './ActiveUsers';
import BandwidthSaved from './BandwidthSaved';
import TopProducts from './TopProducts';
import Weather from './Weather';

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
