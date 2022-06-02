import React,{useState,useEffect} from 'react';
import WeeklySales from './WeeklySales';
import { Row, Col } from 'react-bootstrap';
import {
  marketShare,
  totalOrder,
  totalSales,
  weeklySalesData,
  weather,
  products,
} from 'data/dashboard/default';

import TotalOrder from './TotalOrder';
import MarketShare from './MarketShare';
import TotalSales from './TotalSales';
import BestSellingProducts from './BestSellingProducts';
import Weather from './Weather';

import Http from '../../security/Http';
import url from '../../../Development.json';
import {
  errorResponse,
  successResponse,
  isError,
} from "../../helpers/response";

const Dashboard = () => {

  const [customerTotal, setCutomerTotal] = useState(0);
  const [planTotal, setPlanTotal] = useState(0);

  const dashboard = () => {
    Http.callApi(url.get_dashboard)
      .then((response) => {
        console.log(response);
        setCutomerTotal(response.data.user);
        setPlanTotal(response.data.plan);

      })
      .catch((error) => {
        if (error.response) {
          errorResponse(error);
        }
      });
  }

  useEffect(() => {
    dashboard();
  }, []);



  return (
    <>
      <Row className="g-3 mb-3">
      <Col md={6} xxl={3}>
          <TotalOrder data={totalOrder} data1={customerTotal}/>
        </Col>
        <Col md={6} xxl={3}>
          <WeeklySales data={weeklySalesData} data1 = {planTotal}/>
        </Col>
       
        <Col md={6} xxl={3}>
          <MarketShare data={marketShare} radius={['100%', '87%']} />
        </Col>
        <Col md={6} xxl={3}>
          <Weather data={weather} />
        </Col>
      </Row>

      <Row className="g-3 mb-3">
  
        <Col lg={9} xl={12}>
          <TotalSales data={totalSales} />
        </Col>
      </Row>

      <Row className="g-3 mb-3">
        <Col lg={9} xl={12}>
          <BestSellingProducts products={products} />
        </Col>
     
      </Row>
    </>
  );
};

export default Dashboard;
